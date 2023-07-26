import React from "react";
import { SoundResult, fetchSounds } from "./Sozai";

interface Props {
  children: React.ReactNode;
}

interface Context {
  sounds?: SoundResult;
  fetchSounds: any;
}

export const SozaiContext = React.createContext<Context>({
  sounds: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchSounds: () => {},
});

export const SozaiProvider: React.FC<Props> = (props) => {
  const fetch = (
    setter: React.Dispatch<React.SetStateAction<SoundResult | undefined>>
  ) => {
    console.info(`[SozaiProvider] Fetch invoked`);
    fetchSounds(setter);
  };

  const [sounds, setSounds] = React.useState<SoundResult | undefined>(
    undefined
  );
  React.useEffect(() => {
    fetch(setSounds);
  }, []);

  return (
    <SozaiContext.Provider value={{ sounds, fetchSounds }}>
      {props.children}
    </SozaiContext.Provider>
  );
};
