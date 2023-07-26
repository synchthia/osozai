import { Button } from "flowbite-react";
import { PropsWithChildren, ComponentProps } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PagerProps extends PropsWithChildren, ComponentProps<'nav'> {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pager: React.FC<PagerProps> = (props: PagerProps) => {
  const items = [];
  const pageQuota = props.totalPages > 5 ? 5 : props.totalPages;

  for (let num = props.currentPage <= 2 ? 1 : props.currentPage - 2; num <= pageQuota ? pageQuota : num < props.currentPage + pageQuota / 2 && num <= props.totalPages; num++) {
    items.push(
      num
    );
  }

  return (
    <nav>
      <Button.Group>
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <Button
              positionInGroup="start"
              onClick={() => { props.onPageChange(props.currentPage - 1); }}
              disabled={props.currentPage <= 1}
              className="flex items-center justify-center px-3 h-10 ml-0 leading-tight text-white-500 bg-zinc-800 rounded-l-lg hover:bg-zinc-800 hover:text-white-500">
              <IoArrowBack />
            </Button>
          </li>
          {items.map((e) => {
            return (
              <li key={e}>
                <Button
                  positionInGroup="middle"
                  onClick={() => { props.onPageChange(e); }}
                  className={props.currentPage == e ?
                    'flex items-center justify-center px-3 h-10 leading-tight text-white-500 bg-zinc-1000 hover:bg-white-100 hover:text-white-700' :
                    'flex items-center justify-center px-3 h-10 leading-tight text-white-500 bg-zinc-800 hover:bg-zinc-800 hover:text-white-500'
                  }>
                  {e}
                </Button>
              </li>
            );
          })}
          <li>
            <Button
              positionInGroup="end"
              onClick={() => { props.onPageChange(props.currentPage + 1); }}
              disabled={props.currentPage >= props.totalPages}
              className="flex items-center justify-center px-3 h-10 leading-tight text-white-500 bg-zinc-800 rounded-r-lg hover:bg-zinc-800 hover:text-white-500">
              <IoArrowForward />
            </Button>
          </li>
        </ul>
      </Button.Group>
    </nav>
  );
};