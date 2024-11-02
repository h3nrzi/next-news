import sql from "better-sqlite3";
import { News } from "@/types";

const db = sql("data.db");

export async function getAllNews() {
  const news = db.prepare("SELECT * FROM news").all() as News[];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return news;
}

export async function getNewsItem(slug: string) {
  const newsItem = db
    .prepare("SELECT * FROM news WHERE slug = ?")
    .get(slug) as News;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 10")
    .all() as News[];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year: any) => year.year) as string[];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return years;
}

export function getAvailableNewsMonths(year: string) {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?",
    )
    .all(year)
    .map((month: any) => month.month) as string[];
}

export async function getNewsForYear(year: string) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC",
    )
    .all(year) as News[];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return news;
}

export async function getNewsForYearAndMonth(year: string, month: string) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC",
    )
    .all(year, month) as News[];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return news;
}
