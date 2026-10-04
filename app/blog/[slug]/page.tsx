import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/data/site";

export const revalidate = 600;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 750 }],
      type: "article",
      publishedTime: post.date,
      url: `${SITE.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}${post.coverImage}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="pt-section pb-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="px-5 md:px-10 max-w-3xl mx-auto">
        <Link href="/blog" className="text-small uppercase tracking-wider3 text-muted hover:text-ink">
          ← Back to The Journal
        </Link>
        <p className="section-heading-eyebrow mt-8 mb-4">{post.tags[0]}</p>
        <h1 className="text-h2 sm:text-h1 font-medium text-balance mb-4">{post.title}</h1>
        <p className="text-small text-muted mb-10">
          {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}{" "}
          · {post.author}
        </p>
      </div>

      <div className="relative w-full h-[320px] md:h-[460px] mb-12">
        <Image src={post.coverImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
      </div>

      <div className="px-5 md:px-10 max-w-3xl mx-auto prose-studio">{content}</div>
    </article>
  );
}
