import React from "react";

interface Props {
  children: React.ReactNode;
}

interface Context {
  play: any;
}

export const PlayerContext = React.createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  play: () => {
    console.log(`NO`);
  },
});

export const PlayerProvider: React.FC<Props> = (props) => {
  const play = (url: string) => {
    console.log(`[Player] Invoke URL: ${url}`);
    const audio = new Audio(url);
    audio.volume = 0.1;
    audio.play();
  };
  // const [url, setUrl] = React.useState<string>();
  // //const [player, setPlayer] = React.useState<HTMLAudioElement>();
  // React.useEffect(() => {
  //   // 初回読み込み時にここはロードされる
  //   console.log(`invoked`);
  //   setUrl(url);
  // }, []);

  return (
    <PlayerContext.Provider value={{ play }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
