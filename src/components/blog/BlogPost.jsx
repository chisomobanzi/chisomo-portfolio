import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, getAllPosts } from '../../utils/blog';
import PostMeta from './PostMeta';
import 'highlight.js/styles/github-dark.css';

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-stone-100 mt-10 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-stone-100 mt-10 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-inter font-bold text-lg text-stone-100 mt-8 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-inter text-stone-300 text-base leading-relaxed mb-5">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-3 border-orange-600 pl-5 my-6 italic text-stone-400">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="font-inter text-stone-300 text-base leading-relaxed mb-5 list-disc pl-6 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-inter text-stone-300 text-base leading-relaxed mb-5 list-decimal pl-6 space-y-1">
      {children}
    </ol>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-orange-600 underline decoration-orange-600/30 hover:decoration-orange-600 transition-colors"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className={`${className} text-sm`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="bg-stone-800 text-stone-200 text-sm px-1.5 py-0.5 rounded" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-black text-stone-100 rounded-lg p-5 my-6 overflow-x-auto text-sm leading-relaxed">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt || ''}
        className="w-full rounded-lg"
      />
      {alt && (
        <figcaption className="font-inter text-xs text-stone-500 text-center mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  hr: () => <hr className="border-stone-800 my-10" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} — Chisomo Banzi`;
    }
    return () => { document.title = 'Chisomo Banzi'; };
  }, [slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-orbitron text-2xl font-bold text-stone-100">
            Post Not Found
          </h2>
          <Link
            to="/blog"
            className="inline-block mt-6 font-inter text-sm text-orange-600 hover:text-orange-700 transition-colors"
          >
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  // Find previous/next posts
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-orange-600 transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Posts
          </button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-lg mb-8"
            />
          )}
          <h1 className="font-orbitron font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.02em] text-stone-100 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4">
            <PostMeta date={post.date} readingTime={post.readingTime} tags={post.tags} />
          </div>
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
          >
            {post.body}
          </ReactMarkdown>
        </motion.div>

        {/* Footer */}
        <hr className="border-stone-800 mt-12 mb-8" />

        {/* Prev/Next Navigation */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group block"
              >
                <p className="font-orbitron text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">
                  Previous
                </p>
                <p className="font-inter text-sm text-stone-300 group-hover:text-orange-600 transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group block"
              >
                <p className="font-orbitron text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">
                  Next
                </p>
                <p className="font-inter text-sm text-stone-300 group-hover:text-orange-600 transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-orange-600 transition-colors"
          >
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
