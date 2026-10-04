import { NextRequest, NextResponse } from "next/server";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const post = getBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  }

  const posts = getAllBlogPosts().map((post) => {
    const meta = { ...post };
    delete (meta as { content?: string }).content;
    return meta;
  });
  return NextResponse.json({ posts });
}
