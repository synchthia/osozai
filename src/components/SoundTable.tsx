import React from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { Sound } from "../sozai/sozai";

interface Props {
  sounds: Sound[],
  path?: string,
  search?: string,
  page?: number,
  onPage?: any,
}

const play = (url: string) => {
  console.log("Play...")
  const audio = new Audio(url)
  audio.volume = 0.1;
  audio.play()
}

export const SoundTable: React.FC<Props> = (props: Props) => {
  console.log(props.sounds)
  let result = props.sounds;
  // if (props.search) {
  //   result = props.sounds.filter((v) => {
  //     return v.id.startsWith(props.search!);
  //   })
  // }
  // if (props.path) {
  //   result = result.filter((v) => {
  //     return v.path.startsWith(props.path!);
  //   })
  // }
  const [page, setPage] = React.useState<number>(props.page ? props.page : 1);
  React.useEffect(() => {
    if (props.onPage) {
      props.onPage(page)
    }
  })

  React.useEffect(() => {
    return () => {
      setPage(1)
    }
  }, [props.search])
  result = result.filter((v) => {
    if (props.search?.includes("/")) {
      return v.path.startsWith(props.search!) || v.id.startsWith(props.search!);
    }
    return v.id.startsWith(props.search!);
  })

  const found = result.length
  const limit = 10
  const totalPages = Math.ceil(result.length / limit)
  console.log(`estimated total pages: ${totalPages}`)
  result = result.slice((page - 1) * limit, limit * page)

  let items = []
  const pageQuota = totalPages > 5 ? 5 : totalPages
  for (let number = page <= 2 ? 1 : page - 2; number <= pageQuota ? pageQuota : number < page + pageQuota / 2 && number < totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={() => {
        console.log(number)
        setPage(number)
      }}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <p>Loaded {props.sounds.length} entries / Found {found}</p>
      <Table variant="dark">
        <tbody>
          {result.map((s: Sound) => {
            return (
              <tr>
                <td key={s.path} style={{ cursor: "pointer" }} onClick={() => {
                  play(s.url)
                }}>
                  <h1 style={{ textTransform: "none" }}>{s.id}</h1>
                  {s.path}
                </td>
                <td>
                  <Button onClick={() => { navigator.clipboard.writeText(s.id); }}>Copy</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      {result.length >= 1 &&
        <Pagination>
          <Pagination.First />
          {/* <Pagination.Prev /> */}
          {items}
          {/* <Pagination.Next /> */}
          <Pagination.Last />
        </Pagination>
      }
    </>
  )
}