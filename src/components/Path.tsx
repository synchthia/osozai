import { Sound } from "../sozai/Sozai";

export interface ContentMeta {
  sound?: Sound;
}

export type ContentType = 'FOLDER' | 'FILE';

export interface Content {
  type: ContentType;
  name: string;
  path: string;
  url?: string;
  metadata?: ContentMeta;
}