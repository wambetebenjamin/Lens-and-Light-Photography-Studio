"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
}

export default function InstagramStrip() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden block"
          aria-label={post.caption || "View on Instagram"}
        >
          <Image
            src={post.mediaUrl}
            alt={post.caption || "Lens and Light Instagram post"}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-hover ease-refined group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-hover flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-hover" strokeWidth={1.5} />
          </span>
        </a>
      ))}
    </div>
  );
}
