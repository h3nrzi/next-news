import { ReactNode } from "react";

interface Props {
  archive: ReactNode;
  latest: ReactNode;
}

export default function ArchiveLayout({ archive, latest }: Props) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
}
