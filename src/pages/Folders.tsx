import { Spinner, TextInput, Button } from "flowbite-react";
import React from "react";
import { IoArrowUp, IoFolderOpen, IoSearch } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageBase } from "../components/PageBase";
import { Content } from "../components/Path";
import { Breadcrumb } from "../components/UI";
import { Sound } from "../sozai/Sozai";
import { SozaiContext } from "../sozai/SozaiProvider";
import { Folder } from "../components/Folder";
import { Pager } from "../components/Pager";

const Folders: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPath = params["*"] || "/";
  const path = rawPath.endsWith("/") ? rawPath : rawPath + "/";
  let currentPage = Number(searchParams.get("page") ? searchParams.get("page") : 1);
  // const [currentPage, setCurrentPage] = React.useState<number>(Number(searchParams.get("page")));
  const onPageChange = (page: number) => {
    currentPage = page;
    if (page == 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", String(page));
    }
    setSearchParams(searchParams);
  };

  let searchText = searchParams.get("s") || "";

  // React.useCallback
  // React.useEffect(() => {
  //   setCurrentPage(1);
  //   searchParams.set("page", String(1));
  //   setSearchParams(searchParams);
  // }, [path]);


  // React.useEffect(() => {
  //   console.log(`Path`);
  // }, []);
  // setPath(rawPath.endsWith("/") ? rawPath : rawPath + "/");

  // Parse current directory
  const soundsResult = React.useContext(SozaiContext).sounds;

  // `null` だったらnamespaceが1つしかないやつを採取する
  // `null` じゃないときはそれをnamespaceから除外してフォルダ一覧を構成する
  const res: Sound[] | undefined = soundsResult?.sounds?.filter((e) => {
    if (searchText.includes("/")) {
      return e.path.startsWith(searchText) || e.id.startsWith(searchText);
    } else {
      return e.id.startsWith(searchText);
    }
  });
  if (res == null) {
    return (
      <div className="centerize">
        <h1 className="text-3xl mb-2">Sozai</h1>
        <Spinner aria-label="Loading" className="mr-2" />
        LOADING...
      </div>
    );
  }

  const folders: Array<Content> = [];
  const files: Array<Content> = [];

  // ルートパスではない場合
  //
  // `res.path` を `/` で区切る
  // クライアント側 `path` の `/` の個数+1個になっているものだけを抽出
  //
  //
  const splitPath = path.split("/").filter((e) => e != "");
  const parentDir = path.split(splitPath[splitPath.length - 1])[0];

  // 1つ上に戻るボタン
  if (path !== "/") {
    folders.push({
      type: 'FOLDER',
      name: "..",
      path: parentDir,
    });
  }

  // TODO: 表示のたびにやってると地獄なので、Contextの中でfetch後にいい感じのディレクトリツリーを作ったほうがいいかもしれない。
  res.forEach((item) => {
    const splitSozaiPath = item.path.split("/").filter((e) => e != "");

    if (searchText != "") {
      files.push({
        type: 'FILE',
        name: item.id === item.names[0] ? item.id : `${item.id} (${item.names[0]})`,
        path: splitPath.join("/"),
        url: item.url,
        metadata: {
          sound: item,
        },
      });

    } else {

      if (item.path.startsWith(path) || path === "/") {
        // ファイル取得: 指定したpathと同じ階層のオブジェクトを取得
        if (splitSozaiPath.length - 1 === splitPath.length) {
          files.push({
            type: 'FILE',
            name: item.id,
            path: splitPath.join("/"),
            url: item.url,
            metadata: {
              sound: item,
            },
          });
        }
        // フォルダ取得: 下のオブジェクトを取得
        else if (splitSozaiPath.length - 1 >= splitPath.length) {
          // カレントより下のディレクトリのオブジェクトもリストにされてる
          // → リストにはカレントディレクトリに存在しているフォルダのみ追加する
          // others/hoge/fuga/yo.mp3 とかも 現在地が / ならothers として、
          // hogeなら fugaとしてフォルダを作れるようにしないといけない
          const folderName = splitSozaiPath[splitPath.length];
          const folderPath = splitSozaiPath
            .splice(0, splitSozaiPath.indexOf(folderName) + 1)
            .join("/");

          if (folders.filter((f) => f.name === folderName).length === 0) {
            folders.push({
              type: 'FOLDER',
              name: `${folderName}`,
              path: folderPath,
            });
          }
        }
      }
    }
  });

  // TODO: WTF
  const c = (): Array<Content> => {
    const res: Array<Content> = [];
    splitPath.forEach((p) => {
      res.push({
        type: 'FOLDER',
        name: p,
        path: splitPath.slice(0, splitPath.indexOf(p) + 1).join("/"),
      });
    });
    return res;
  };

  const breadPath: Array<Content> = [
    {
      type: 'FOLDER',
      name: "Home",
      path: "/",
    },
    ...c(),
  ];

  const perContent = 50;
  const contents: Array<Content> = [...folders, ...files];
  const totalPages = Math.ceil(contents.length / perContent);

  const onSubmit = (event: any) => {
    console.log(`[Search] submit`);
    if (searchText.length == 0) {
      navigate("/");
    } else {
      navigate("/?s=" + searchText);
    }
    // setSearchParams(searchParams);
    // onPageChange(1);
    // setSearchText()
    event.preventDefault();
    event.stopPropagation();
  };

  const onSearchTextChange = (event: any) => {
    searchText = event.target.value;
  };

  return (
    <PageBase>
      <h1 className="flex items-center rounded-md text-3xl">
        {searchText ? <><IoSearch className="mr-2" />Search: {searchText}</> : <><IoFolderOpen className="mr-2" /> Osozai</>}
      </h1>
      <h2>(Page: {currentPage} / {totalPages})</h2>
      <div className="mt-4">
        <Breadcrumb path={breadPath} />
        <hr className="mt-2 mb-2" />
        <span>
          <form onSubmit={onSubmit}>
            <TextInput
              icon={IoSearch}
              id="search"
              type="text"
              placeholder="Search?"
              onChange={onSearchTextChange}
              defaultValue={searchText}

              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </form>
        </span>
        <p>Loaded {soundsResult?.sounds?.length} entries / Files: {files.length}</p>
        <Folder
          contents={contents.slice(perContent * (currentPage - 1), perContent * currentPage)}
          page={currentPage}
          jump={searchText != ""}
        />
      </div>
      <div>
        <div className="justify-between text-center mt-5">
          {totalPages >= 2 ?
            <div className="p-5">
              <p className="m-3">Page {currentPage} of {totalPages}</p>
              <Pager
                currentPage={currentPage}
                onPageChange={page => onPageChange(page)}
                totalPages={totalPages}
              />
            </div> : <></>
          }
          <Button
            className="-flex text-white bg-zinc-800 justify-between text-center"
            size="xl"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <IoArrowUp />
          </Button>
        </div>
      </div>
    </PageBase>
  );
};

export default Folders;