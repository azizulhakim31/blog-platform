import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { FiArrowDown, FiSearch, FiTrendingUp } from "react-icons/fi";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  
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
                Ideas become stories .
                <span className="block mt-2 text-primary">Stories inspire change .</span>
              </h1>

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
      </main>

      <Footer />
    </div>
  );
};

export default Home;