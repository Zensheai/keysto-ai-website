import { useEffect } from "react";
import { site } from "../content";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

const { blog } = site;

// Map post category to thumbnail image
function categoryToImage(category: string): string {
  const c = category.toUpperCase();
  if (c === "CLAUDE") return "/images/tutorial-claude.jpg";
  if (c === "AI TOOLS") return "/images/tutorial-tools.jpg";
  if (c === "VIDEO PRODUCTION" || c === "AVATAR") return "/images/tutorial-avatar.jpg";
  return "/images/tutorial-claude.jpg";
}

export default function Blog() {
  useEffect(() => initReveals(), []);
  return (
    <div>
      <Seo
        title="AI Workflow Guides & Tutorials | Keys to AI"
        description="Written AI tutorials for solopreneurs. Read the guide, watch the video, and download the resources — every workflow worth your time."
        path="/blog"
      />
      {/* Hero header — dark bg */}
      <div className="bg-bg-dark py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p
            className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3 blog-header"
            data-reveal
          >
            {blog.eyebrow}
          </p>
          <h1
            className="font-display text-[clamp(2.5rem,5vw,4rem)] text-bg-warm leading-[1.0] tracking-[-0.02em] mb-4 blog-header"
            data-reveal
          >
            {blog.title}
          </h1>
          <p
            className="font-body text-lg text-text-muted max-w-[560px] blog-header"
            data-reveal
          >
            {blog.intro}
          </p>
        </div>
      </div>

      {/* Posts grid + newsletter CTA — warm bg */}
      <div className="bg-bg-warm py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Post cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.posts.map((post) => (
              <a
                key={post.href}
                className="blog-card group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-card hover:border-text-muted-light transition-all duration-300"
                href={post.href}
                data-reveal
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={categoryToImage(post.category)}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[0.625rem] text-accent-teal uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-text-muted-light">·</span>
                    <span className="font-mono text-[0.625rem] text-text-muted">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-body font-semibold text-lg text-bg-dark leading-snug line-clamp-3 mb-3">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-text-secondary line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <span className="font-body font-medium text-sm text-bg-dark group-hover:text-accent-teal transition-colors">
                    {post.cta}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-text-secondary mb-4">
              {blog.newsletterCta.text}
            </p>
            <a
              href={blog.newsletterCta.href}
              className="inline-block bg-bg-dark text-bg-warm font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-surface-dark transition-colors"
            >
              {blog.newsletterCta.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
