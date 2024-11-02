import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  model: ReactNode;
}

export default function NewDetailLayout({ children, model }: Props) {
  return (
    <>
      {model}
      {children}
    </>
  );
}
