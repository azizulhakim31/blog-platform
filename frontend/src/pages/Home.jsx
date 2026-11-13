import { FiArrowDown, FiSearch, FiTrendingUp } from "react-icons/fi";
import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import FeaturedPost from "../components/blog/FeaturedPost";
import CategoryFilter from "../components/blog/CategoryFilter";
import BlogCard from "../components/blog/BlogCard";

import { categories } from "../data/blogs";
import Newsletter from "../components/common/Newsletter";
import { getBlogs } from "../services/blogService";
import formatBlog from "../utils/formatBlog";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page: 1,
          limit: 20,
        };

        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        if (activeCategory !== "All") {
          params.category = activeCategory;
        }

        const data = await getBlogs(params);

        if (isCurrentRequest) {
          const fetchedBlogs = (data.blogs || []).map(formatBlog);
          setBlogs(fetchedBlogs);
          setTotalBlogs(data.totalBlogs ?? fetchedBlogs.length);
        }
      } catch (err) {
        if (isCurrentRequest) {
          setError(
            err.response?.data?.message ||
            "Unable to load blogs. Please try again."
          );
          setBlogs([]);
          setTotalBlogs(0);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(fetchBlogs, 400);

    return () => {
      isCurrentRequest = false;
      clearTimeout(timer);
    };
  }, [searchQuery, activeCategory, retryCount]);

  const featuredBlog = blogs[0];
  const latestBlogs = blogs.slice(1);

  return (
    <div id="home" className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-base-300">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-secondary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="badge badge-primary badge-outline font-medium p-4">
                <FiTrendingUp />
                A community of curious minds
              </div>

              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Ideas become stories.
                <span className="block mt-2 text-primary">Stories inspire change.</span>
              </h1>

              <p className="mx-auto mt-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium italic tracking-wide text-primary sm:text-base">
                Every story deserves a place
              </p>

              <p className="mx-auto mt-6 max-w-2xl leading-7 text-base-content/70 sm:text-lg sm:leading-8">
                Discover fresh perspectives, explore ideas that matter and share your own stories with a community that loves to learn.
              </p>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("blogs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg sm:flex-row"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <FiSearch
                    size={20}
                    className="shrink-0 text-base-content/50"
                  />
                  <input
                    type="search"
                    aria-label="Search articles"
                    placeholder="Search stories, topics, authors..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="input input-ghost w-full min-w-0 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Explore stories
                </button>
              </form>

              <a
                href="#featured"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition hover:text-primary"
              >
                Discover today's featured story <FiArrowDown />
              </a>
            </div>
          </div>
        </section>

        {/* Featured article */}
        <section
          id="featured"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          {!loading && !error && featuredBlog && (
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">
                  Editor's pick
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  The story to start with
                </h2>
              </div>
            </div>
          )}

          {!loading && !error && featuredBlog && (
            <FeaturedPost blog={featuredBlog} />
          )}
        </section>

        {/* Latest articles */}
        <section
          id="blogs"
          className="border-y border-base-300 bg-base-200/50"
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">
                  The reading list
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Latest stories
                </h2>
                <p className="mt-3 max-w-xl text-base-content/65">
                  Fresh ideas and useful perspectives from our writers.
                </p>
              </div>

              <span className="badge badge-primary badge-outline">
                {totalBlogs} {totalBlogs === 1 ? "article" : "articles"}
              </span>
            </div>

            <div className="mt-8">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {loading && (
              <div className="flex justify-center py-16">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            )}

            {!loading && error && (
              <div className="mt-8 rounded-2xl border border-error/20 bg-error/10 px-6 py-12 text-center">
                <p className="text-error">{error}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-5"
                  onClick={() => setRetryCount((count) => count + 1)}
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && blogs.length > 0 && latestBlogs.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}

            {!loading && !error && blogs.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-base-300 bg-base-100 px-6 py-16 text-center">
                <FiSearch className="mx-auto text-3xl text-base-content/40" />
                <h3 className="mt-4 text-xl font-bold">
                  No stories found
                </h3>
                <p className="mt-2 text-base-content/65">
                  Try another keyword or choose a different category.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-5"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("All")
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section
          id="newsletter"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <Newsletter />
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;