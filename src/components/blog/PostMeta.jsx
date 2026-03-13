const PostMeta = ({ date, readingTime, tags = [] }) => {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-inter text-sm text-stone-500">
      <time dateTime={date}>{formatted}</time>
      <span className="text-stone-600">·</span>
      <span>{readingTime} min read</span>
      {tags.length > 0 && (
        <>
          <span className="text-stone-600">·</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-stone-800 text-stone-400 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostMeta;
