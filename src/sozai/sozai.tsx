import { AxiosError } from "axios";
import axios from "../httpClient";
import React from "react";
import { ErrorResponse, FAILED, PENDING, Status, SUCCESS } from "./status";

export interface Sound {
    names: string[],
    namespaces: string[],
    url: string,
    id: string,
    path: string,
    hash: string,
}

export interface SoundResult {
    status: Status,
    sounds?: Sound[],
    error?: AxiosError<ErrorResponse>,
}

export function fetchSounds(setResult: React.Dispatch<React.SetStateAction<SoundResult | undefined>>) {
    setResult({
        status: PENDING,
    })

    axios.get<Sound[]>(`https://synchthia-sounds.storage.googleapis.com/index.json`)
        .then(response => setResult({
            status: SUCCESS,
            sounds: response.data,
        }))
        .catch((error: AxiosError<ErrorResponse>) => {
            console.error(`*** Sounds > Fetch error:`);
            console.error(error);
            setResult({
                status: FAILED,
                error: error,
            })
        })
}