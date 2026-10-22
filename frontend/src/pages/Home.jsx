import { Link } from 'react-router-dom'
import { FaArrowRight, FaBookOpen, FaFeatherAlt, FaRegComments } from 'react-icons/fa'

const waysToBegin = [
  {
    number: '01',
    icon: FaFeatherAlt,
    title: 'Put your ideas into words',
    description: 'Turn a passing thought, a hard-won lesson, or a big idea into a story of your own.',
  },
  {
    number: '02',
    icon: FaBookOpen,
    title: 'Find a fresh perspective',
    description: 'Explore thoughtful writing across creativity, culture, technology, and everyday life.',
  },
  {
    number: '03',
    icon: FaRegComments,
    title: 'Make room for conversation',
    description: 'Share what you know, learn from others, and let good ideas travel further.',
  },
]

const topics = ['Creativity', 'Culture', 'Technology', 'Everyday life', 'Personal growth', 'Ideas']

const Home = () => (
  <div className="home-page">
    <section className="home-hero">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A home for curious minds</span>
          <h1>Every good idea<br />starts <span>somewhere.</span></h1>
          <p className="hero-description">
            BlogHub is a space to write what matters, discover a point of view you hadn’t considered,
            and connect through stories.
          </p>
          <div className="hero-actions">
            <Link to="/about#community" className="button">
              Find your place <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/about" className="text-link">
              Get to know us <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <span>Thoughtful writing. Open-minded reading. A community built around ideas.</span>
          </div>
        </div>

        <div className="hero-aside">
          <p>Ideas are better when they’re shared.</p>
          <span>Read something new. Write something true.</span>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-line" />
      </div>
    </section>

    <section className="intro-section section-space" id="discover">
      <div className="page-width intro-layout">
        <p className="section-index">THE IDEA</p>
        <div>
          <h2 className="section-heading">
            The internet is better<br />when we <em>share what we know.</em>
          </h2>
          <div className="intro-bottom">
            <p className="body-copy">
              A story can make a complicated subject feel clear, or a faraway experience feel close.
              BlogHub brings writers and readers together to make more of those moments possible.
            </p>
            <Link to="/about" className="underlined-link">
              More about BlogHub <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="ways-section section-space">
      <div className="page-width">
        <div className="section-topline">
          <p className="section-index">MAKE YOURSELF AT HOME</p>
          <span className="section-aside">A little inspiration goes a long way.</span>
        </div>
        <div className="ways-heading-row">
          <h2 className="section-heading">Read. Write. <em>Connect.</em></h2>
          <p className="body-copy">However you arrive, there’s room for you here.</p>
        </div>
        <div className="ways-grid">
          {waysToBegin.map(({ number, icon: Icon, title, description }) => (
            <article className="way-card" key={number}>
              <div className="way-card-top">
                <span className="way-number">{number}</span>
                <Icon className="way-icon" aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to="/about#community" aria-label={`Learn more: ${title}`} className="card-arrow">
                <FaArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="topics-section section-space">
      <div className="page-width topics-layout">
        <div>
          <p className="section-index">FOLLOW YOUR CURIOSITY</p>
          <h2 className="section-heading">A thousand ways<br />to <em>see the world.</em></h2>
          <p className="body-copy">Start with what you love. You never know where a good read will take you.</p>
        </div>
        <div className="topic-list" aria-label="Topics to explore">
          {topics.map((topic, index) => (
            <span className={`topic topic-${index + 1}`} key={topic}>
              {topic}<span aria-hidden="true">↗</span>
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="home-cta">
      <div className="page-width cta-content">
        <p className="section-index">YOUR STORY BELONGS HERE</p>
        <h2>Bring your curiosity.<br /><em>We’ll bring a blank page.</em></h2>
        <Link to="/about#community" className="button button-light">
          Come say hello <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  </div>
)

export default Home
