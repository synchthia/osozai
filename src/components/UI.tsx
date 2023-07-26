import { IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Content } from "./Path";

interface Props {
  children: React.ReactNode;
}

interface BreadcrumbProps {
  path: Array<Content>;
}

export function H1(props: Props): JSX.Element {
  return <h1 className="text-3xl">{props.children}</h1>;
}

export function SearchBox(props: Props): JSX.Element {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {props.path.length != 0 &&
          props.path.map((p) => (
            <li className="inline-flex items-center" key={p.path}>
              <Link
                to={p.path}
                className="inline-flex items-center text-lg font-medium"
              >
                {p.name}
              </Link>
              {props.path.indexOf(p) !== props.path.length - 1 && (
                <IoChevronForwardOutline
                  aria-hidden="true"
                  className="text-xs mx-2"
                />
              )}
            </li>
          ))}

        {/*<IoIosArrowForward />*/}
      </ol>
    </nav>
  );
}
