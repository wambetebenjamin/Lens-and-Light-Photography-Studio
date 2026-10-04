import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section id="blog" className="py-section px-5 md:px-10 bg-surface-tint">
      <SectionHeading
        eyebrow="From The Journal"
        title="Tips, Guides & Nairobi Locations"
        description="Photography tips, posing guides and location spotlights from our team — written for clients and fellow photographers alike."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative w-full h-64 overflow-hidden bg-surface">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-[600ms] ease-refined group-hover:scale-[1.04]"
              />
            </div>
            <p className="text-caption uppercase tracking-wider3 text-muted">
              {post.tags[0]} · {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h3 className="text-h4 font-medium text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            <p className="text-small text-body">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link href="/blog" className="btn-studio-outline">
          Visit The Journal
        </Link>
      </div>
    </section>
  );
}
