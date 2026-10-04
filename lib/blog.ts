import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogMeta {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  tags: string[];
}

export interface BlogPost extends BlogMeta {
  content: string;
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readFileByFilename(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${filename}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    date: data.date,
    author: data.author,
    tags: data.tags || [],
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const filenames = getAllBlogSlugs();
  const posts = filenames.map(readFileByFilename);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
