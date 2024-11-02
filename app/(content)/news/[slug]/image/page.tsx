import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

interface Props {
  params: { slug: string };
}

export default async function InterceptedImagePage({ params }: Props) {
  const newsItem = await getNewsItem(params.slug);
  if (!newsItem) return notFound();

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
