import { useEffect } from 'react';

// Canonical production origin (no trailing slash). Update if the domain changes.
export const SITE_URL = 'https://honorfirstlife.com';

type SeoOptions = {
  /** Route path used to build the canonical and og:url, e.g. "/" or "/terms". */
  path?: string;
  /** Absolute or root-relative social share image. Defaults to the OG image. */
  image?: string;
  /** When true, sets robots to noindex,nofollow (e.g. thank-you page). */
  noindex?: boolean;
  /** Open Graph type. Defaults to "website". */
  type?: string;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo(title: string, description: string, options: SeoOptions = {}) {
  const { path, image = '/opengraph.jpg', noindex = false, type = 'website' } = options;

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    const img = image.startsWith('http') ? image : SITE_URL + image;

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:site_name', 'HonorFirstLife');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);

    if (path) {
      const url = SITE_URL + path;
      upsertMeta('property', 'og:url', url);
      upsertCanonical(url);
    }
  }, [title, description, path, image, noindex, type]);
}
