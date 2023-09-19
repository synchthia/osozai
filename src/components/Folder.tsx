import React from "react";
import { Content } from "./Path";
import { Tooltip, Button } from "flowbite-react";
import {
  IoCopy,
  IoDownload,
  IoFolderOutline,
  IoMusicalNotesSharp,
  IoPaperPlane,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { PlayerContext } from "../player/PlayerProvider";

interface Props {
  contents: Array<Content>;
  page?: number;
  jump: boolean;
}

const FileTitle = (props: any) => {
  return <p className="text-lg">{props.children}</p>;
};

export const Folder: React.FC<Props> = (props: Props) => {
  const folders = props.contents.filter((e) => e.type === "FOLDER");
  const files = props.contents.filter((e) => e.type === "FILE");

  const playerContext = React.useContext(PlayerContext);

  return (
    <>
      <table className="w-full text-sm text-left bg-zinc-800">
        <tbody>
          {
            // Append folders
          }
          {folders.length >= 1 &&
            folders.map((folder) => (
              <tr key={folder.url + folder.path}>
                <th scope="col" className="px-6 py-3">
                  <Link to={`/${folder.path}`}>
                    <FileTitle>
                      <IoFolderOutline className="inline mr-2" />
                      {folder.name}
                    </FileTitle>
                  </Link>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            ))}
          {
            // Append files
          }
          {files.length >= 1 &&
            files.map((file) => (
              <tr key={file.url + file.path}>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => {
                    console.log(`[Player] Playing: ${file.name} (${file.url})`);
                    playerContext.play(file.url);
                  }}
                >
                  <button>
                    <FileTitle>
                      <IoMusicalNotesSharp className="inline mr-2" />
                      {file.name}
                    </FileTitle>
                  </button>
                  <p>{file.metadata?.sound?.path}</p>
                </th>
                <td className="px-6 py-3 text-right">
                  <Button.Group>
                    {file.metadata && file.metadata.sound && (
                      <>
                        <Tooltip
                          content={`Open: ${file.metadata?.sound?.names[0]}`}
                          trigger="click"
                        >
                          <Button
                            data-tooltip-target="tooltip-default"
                            type="button"
                            color="gray"
                            href={file.metadata?.sound?.url}
                          >
                            <IoDownload className="mr-1" />
                            Download
                          </Button>
                        </Tooltip>

                        <Tooltip
                          content={`Copied: ${file.metadata?.sound?.names[0]}`}
                          trigger="click"
                        >
                          <Button
                            data-tooltip-target="tooltip-default"
                            type="button"
                            color="gray"
                            className="ml-2"
                            onClick={() => {
                              const name = file.metadata?.sound?.names[0];
                              name && navigator.clipboard.writeText(name);
                            }}
                          >
                            <IoCopy className="mr-1" />
                            Copy
                          </Button>
                        </Tooltip>
                      </>
                    )}
                    {props.jump ? (
                      <Link to={`/${file.metadata?.sound?.namespaces[0]}`}>
                        <Button
                          data-tooltip-target="tooltip-default"
                          type="button"
                          color="purple"
                          className="ml-2"
                          onClick={() => {
                            const name = file.metadata?.sound?.names[0];
                            name && navigator.clipboard.writeText(name);
                          }}
                        >
                          <IoPaperPlane className="mr-1" />
                          Jump
                        </Button>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Button.Group>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
