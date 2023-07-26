interface Props {
  children: React.ReactNode;
}

export function PageBase(props: Props): JSX.Element {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
      {props.children}
    </div>
  );
}
