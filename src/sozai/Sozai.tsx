import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  FAILED,
  PENDING,
  SUCCESS,
  Status,
} from "../httpClient/status";

export interface Sound {
  names: string[];
  namespaces: string[];
  url: string;
  id: string;
  path: string;
  hash: string;
}

export interface SoundResult {
  status: Status;
  sounds?: Sound[];
  error?: AxiosError<ErrorResponse>;
}

export const SOZAI_INDEX_URL = `https://synchthia-sounds.storage.googleapis.com/index.json`;

export function fetchSounds(
  setResult: React.Dispatch<React.SetStateAction<SoundResult | undefined>>
) {
  setResult({
    status: PENDING,
  });

  axios
    .get<Sound[]>(`${SOZAI_INDEX_URL}`)
    .then((response) =>
      setResult({
        status: SUCCESS,
        sounds: response.data,
      })
    )
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error(
        `[SOZAI] Failed fetch sounds data from: ${SOZAI_INDEX_URL}`
      );
      console.error(error);

      setResult({
        status: FAILED,
        error: error,
      });
    });
}
