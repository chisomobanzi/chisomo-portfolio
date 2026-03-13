import fm from 'front-matter';

const postFiles = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

function parsePost(raw) {
  const { attributes, body } = fm(raw);
  return {
    ...attributes,
    readingTime: attributes.readingTime || estimateReadingTime(body),
    featured: attributes.featured || false,
    tags: attributes.tags || [],
    body,
  };
}

export function getAllPosts() {
  const posts = Object.values(postFiles).map((raw) => parsePost(raw));

  // Sort: featured first, then by date descending
  return posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
