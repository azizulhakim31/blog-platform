import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/blogs/${blog.slug}`}
                className="relative block aspect-16/10 overflow-hidden bg-base-200"
                aria-label={`Read ${blog.title}`}
            >
                <img
                    src={blog.cover}
                    alt={blog.title}
                    loading="lazy"
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 badge border-0 bg-base-100/95 px-3 py-3 font-medium">
                    {blog.category}
                </span>
            </Link>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                    <span>{blog.date}</span>
                    <span>.</span>
                    <FiClock />
                    <span>{blog.readTime}</span>
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight">
                    <Link to={`/blogs/${blog.slug}`}
                        className="transition-colors hover:text-primary">
                        {blog.title}
                    </Link>
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-base-content/70">
                    {blog.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-base-300 pt-4">
                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            src={blog.avatar}
                            loading="lazy"
                            className="size-9 rounded-full object-cover"
                        />
                        <span className="truncate text-sm font-medium">
                            {blog.author}
                        </span>
                    </div>

                    <Link to={`/blogs/${blog.slug}`}
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label={`Read ${blog.title}`}
                    >
                        <FiArrowUpRight size={18} />
                    </Link>
                </div>

            </div>
        </article>
    );
};

export default BlogCard;