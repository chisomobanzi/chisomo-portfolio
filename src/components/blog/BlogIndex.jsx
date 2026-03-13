import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPosts } from '../../utils/blog';
import PostCard from './PostCard';

const BlogIndex = () => {
  const posts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog — Chisomo Banzi';
    return () => { document.title = 'Chisomo Banzi'; };
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-orbitron text-[11px] tracking-[0.3em] uppercase text-orange-600 font-medium">
            Writing
          </p>
          <h1 className="font-orbitron font-bold text-3xl sm:text-4xl tracking-[0.02em] text-stone-100 mt-3">
            Blog
          </h1>
          <p className="font-inter text-stone-400 text-base leading-relaxed mt-4">
            Notes on film, virtual production, language learning, and building things.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="mt-12 space-y-6">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))
          ) : (
            <p className="font-inter text-stone-500 text-sm">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
