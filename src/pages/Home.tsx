import React from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { SoundTable } from "../components/SoundTable";
import { fetchSounds, SoundResult } from "../sozai/sozai";
import history from 'history/createBrowserHistory';
import { RouteComponentProps, useLocation } from "react-router";

interface Props extends RouteComponentProps<{}> { }

const Home: React.FC<Props> = (props: Props) => {
  console.log(props.match);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const [preSearchText, setPreSearchText] = React.useState<string>(query.get("s") != null ? query.get("s")! : "");
  const [searchText, setSearchText] = React.useState<string>(query.get("s") != null ? query.get("s")! : "");
  const [soundsResult, setSounds] = React.useState<SoundResult | undefined>(undefined);
  const [page, setPage] = React.useState<number>(query.get("page") != null ? Number(query.get("page")!) : 1);
  const updateQuery = () => {
    const params = new URLSearchParams(props.location.search)
    preSearchText && params.set("s", preSearchText)
    page > 1 && params.set("page", `${page}`)
    history().push({
      search: params.toString(),
    })
  }
  React.useEffect(() => {
    updateQuery()
  }, [page, updateQuery])

  const fetch = () => {
    console.log("Fetching...")
    fetchSounds(setSounds);
  }

  React.useEffect(() => {
    fetch();
  }, [])

  const onSubmit = (event: any) => {
    console.log("update...")
    // propsのhandleUpdateに確定後の処理を委譲する
    setSearchText(preSearchText)
    updateQuery()
    // 送信時のページ遷移を抑止する
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div>
      <Navbar variant="dark" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Osozai</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" active>Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {soundsResult?.sounds ?
        <Container fluid="lg">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control type="text" placeholder="Search?" defaultValue={searchText} onChange={(e: any) => {
                setPreSearchText(e.currentTarget.value);
              }} />
            </Form.Group>
          </Form>
          <SoundTable sounds={soundsResult?.sounds} search={searchText} path={searchText} page={page} onPage={(p: number) => {
            setPage(p)
          }} />
        </Container>
        :
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      }
    </div>
  )
}

export default Home;