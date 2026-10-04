import { NextResponse } from "next/server";
import { SITE } from "@/lib/data/site";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
}

const FALLBACK_POSTS: InstagramPost[] = [
  { id: "fallback-1", mediaUrl: "/images/instagram/post-1.jpg", permalink: SITE.social.instagram, caption: "Wedding season in Nairobi" },
  { id: "fallback-2", mediaUrl: "/images/instagram/post-2.jpg", permalink: SITE.social.instagram, caption: "Portrait of the week" },
  { id: "fallback-3", mediaUrl: "/images/instagram/post-3.jpg", permalink: SITE.social.instagram, caption: "Brand shoot behind the scenes" },
  { id: "fallback-4", mediaUrl: "/images/instagram/post-4.jpg", permalink: SITE.social.instagram, caption: "Celebration coverage" },
  { id: "fallback-5", mediaUrl: "/images/instagram/post-5.jpg", permalink: SITE.social.instagram, caption: "Studio fine art series" },
  { id: "fallback-6", mediaUrl: "/images/instagram/post-6.jpg", permalink: SITE.social.instagram, caption: "Lighting setup for today's shoot" },
];

/**
 * Proxies the Instagram Basic Display API when INSTAGRAM_TOKEN is
 * configured. Falls back to a static, curated set of posts otherwise so
 * the footer Instagram strip always renders something meaningful.
 */
export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;

  if (!token) {
    return NextResponse.json(
      { posts: FALLBACK_POSTS, source: "fallback" },
      { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=300" } }
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption&access_token=${token}&limit=6`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Instagram API responded ${res.status}`);
    const data = await res.json();
    type RawInstagramPost = {
      id: string;
      media_url: string;
      permalink: string;
      caption?: string;
    };
    const posts: InstagramPost[] = ((data.data || []) as RawInstagramPost[]).map((p) => ({
      id: p.id,
      mediaUrl: p.media_url,
      permalink: p.permalink,
      caption: p.caption,
    }));
    return NextResponse.json({ posts, source: "instagram" });
  } catch (err) {
    console.error("[api/instagram] falling back to static posts", err);
    return NextResponse.json({ posts: FALLBACK_POSTS, source: "fallback" });
  }
}
