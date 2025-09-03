"use server";

import axios from "axios";
import * as cheerio from "cheerio";


export interface SEOResult {
  meta: {
    title: string | null;
    description: string | null;
    canonical: string | null;
  };
  headings: {
    h1: string[];
    h2: string[];
  };
  images: {
    total: number;
    noAlt: number;
  };
  links: {
    total: number;
    internal: number;
    external: number;
  };
  content: {
    wordCount: number;
  };
 
}

export const analyze = async (url: string): Promise<{ data: SEOResult }> => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);
    // Meta
    const title = $("title").text() || "Tidak ada";
    const description =
      $('meta[name="description"]').attr("content") || "Tidak ada";
    const canonical = $('link[rel="canonical"]').attr("href") || "Tidak ada";

    // Headings
    const h1 = $("h1")
      .map((i, el) => $(el).text())
      .get();
    const h2 = $("h2")
      .map((i, el) => $(el).text())
      .get();

    // Images
    const images = $("img")
      .map((i, el) => ({
        src: $(el).attr("src"),
        alt: $(el).attr("alt") || "Tidak ada",
      }))
      .get();

    // Links
    const links = $("a")
      .map((i, el) => ({
        href: $(el).attr("href"),
        rel: $(el).attr("rel") || "",
      }))
      .get();

    // Word count
    const wordCount = $("body").text().split(/\s+/).length;

    return {
      data: {
        meta: { title, description, canonical },
        headings: { h1, h2 },
        images: {
          total: images.length,
          noAlt: images.filter((img) => img.alt === "Tidak ada").length,
        },
        links: {
          total: links.length,
          internal: links.filter(
            (l) => l.href?.startsWith("/") || l.href?.includes(url)
          ).length,
          external: links.filter(
            (l) => l.href?.startsWith("http") && !l.href.includes(url)
          ).length,
        },
        content: { wordCount },
      },
    };
  } catch (error) {
    console.error("Error fetching the URL:", error);
    throw new Error("Failed to analyze the URL");
  }
};
