import { useEffect } from "react";

// Lightweight, dependency-free per-route head manager. Each page renders one
// <Seo /> with its title/description/path; this sets document.title plus the
// description, canonical, Open Graph, and Twitter tags. Tags are upsert-ed
// (created once, then updated), and since every page supplies all fields, the
// head never carries stale values between routes.
//
// Caveat: meta is injected with JS. Google renders JS so this is read for
// search. Social crawlers (Facebook, LinkedIn, X, iMessage) do NOT run JS —
// they fall back to the static tags in index.html. True per-page social
// previews need build-time prerendering (a separate task).

const SITE = "https://keysto.ai";
const DEFAULT_IMAGE = `${SITE}/images/hero-portrait.jpg`;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path, image, type = "website" }: SeoProps) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const img = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : DEFAULT_IMAGE;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image, type]);

  return null;
}
