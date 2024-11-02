import Link from "next/link";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function NewsDetailsPage({ params }: Props) {
  const newsItem = await getNewsItem(params.slug);
  if (!newsItem) return notFound();

  return (
    <article>
      <header className="news-article">
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
