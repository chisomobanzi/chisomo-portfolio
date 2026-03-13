import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PostMeta from './PostMeta';

const PostCard = ({ post, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-white rounded-lg border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        {post.coverImage && (
          <div className="aspect-[2.2/1] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          {post.featured && (
            <span className="inline-block font-orbitron text-[9px] tracking-[0.15em] uppercase bg-orange-100 text-orange-600 px-2 py-0.5 rounded mb-3">
              Featured
            </span>
          )}
          <h2 className="font-orbitron font-bold text-lg sm:text-xl text-stone-800 group-hover:text-orange-600 transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="font-inter text-stone-500 text-sm leading-relaxed mt-2 line-clamp-2">
            {post.description}
          </p>
          <div className="mt-4">
            <PostMeta date={post.date} readingTime={post.readingTime} tags={post.tags} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
