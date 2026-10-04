import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Photography tips, posing guides and Nairobi location spotlights from the Lens & Light Photography Studio team.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <section className="pt-section pb-section px-5 md:px-10">
      <SectionHeading
        eyebrow="The Journal"
        title="Tips, Guides & Nairobi Locations"
        description="Everything we know about light, posing and the best spots in Nairobi to shoot — shared freely."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
            <div className="relative w-full h-64 overflow-hidden bg-surface-tint">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-[600ms] ease-refined group-hover:scale-[1.04]"
              />
            </div>
            <p className="text-caption uppercase tracking-wider3 text-muted">
              {post.tags[0]} ·{" "}
              {new Date(post.date).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-h4 font-medium text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h2>
            <p className="text-small text-body">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
