import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { News } from "@/types";
import { Suspense } from "react";

interface Props {
  params: { filter?: string[] };
}

interface FilteredProps {
  year?: string;
  month?: string;
}

async function FilteredHeader({ year, month }: FilteredProps) {
  const availableYears = await getAvailableNewsYears();
  const availableMonths = getAvailableNewsMonths(year!);

  if (
    (year && !availableYears.includes(year)) ||
    (month && !availableMonths.includes(month))
  )
    throw new Error("Invalid filter.");

  let links = await getAvailableNewsYears();
  if (year && !month) links = getAvailableNewsMonths(year);
  if (year && month) links = [];

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }: FilteredProps) {
  let news: News[] = [];

  if (year && !month) news = await getNewsForYear(year);
  if (year && month) news = await getNewsForYearAndMonth(year, month);

  return (
    <>
      {news && news.length > 0 ? (
        <NewsList news={news} />
      ) : (
        <p>No news found for the selected period.</p>
      )}
    </>
  );
}

export default async function FilteredNewsPage({ params }: Props) {
  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filters...</p>}>
        <FilteredHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
