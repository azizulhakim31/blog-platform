import { FaBookOpen, FaArrowRight, FaPenNib } from "react-icons/fa";

const App = () => {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <nav className="navbar rounded-box bg-base-100 px-5 shadow-sm">
          <div className="flex-1 gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
              <FaBookOpen size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              BlogSpace
            </span>
          </div>

          <div className="flex-none">
            <span className="badge badge-primary badge-outline">
              Segment 1
            </span>
          </div>
        </nav>

        <section className="mt-16 text-center">
          <div className="badge badge-secondary mb-5 gap-2 p-4">
            <FaPenNib />
            Your next story starts here
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Ideas worth sharing.
            <span className="mt-2 block text-primary">
              Stories worth reading.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base-content/70 sm:text-lg">
            A home for your thoughts, stories, and ideas.
            Discover great articles and share your own perspective
            with the world.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="btn btn-primary">
              Start writing <FaArrowRight />
            </button>

            <button className="btn btn-outline">
              Explore blogs
            </button>
          </div>
        </section>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "React",
              description: "Build dynamic user interfaces.",
            },
            {
              title: "Tailwind CSS",
              description: "Style pages with utility classes.",
            },
            {
              title: "DaisyUI",
              description: "Create interfaces with components.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-sm text-base-content/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
