import { FiArrowUpRight, FiClock } from "react-icons/fi";

const FeaturedPost = ({ blog }) => {
    if (!blog) return null;

    return (
        <article className="grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 lg:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden lg:min-h-97.5">
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="absolute inset-0 size-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute left-5 top-5 badge badge-primary p-3 font-semibold">
                    Featured story
                </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {blog.category}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                    {blog.title}
                </h2>
                <p className="mt-4 leading-7 text-base-content/70">
                    {blog.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-3">
                    <img
                        src={blog.avatar}
                        alt={blog.author}
                        className="size-11 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{blog.author}</p>
                        <p className="text-sm text-base-content/60">{blog.date}</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 text-sm text-base-content/60">
                        <FiClock />
                        {blog.readTime}
                    </span>
                </div>

                <a
                    href={`#article-${blog.slug}`}
                    className="btn btn-primary mt-8 w-fit"
                >
                    Read featured story <FiArrowUpRight size={18} />
                </a>
            </div>
        </article>
    );
};

export default FeaturedPost;