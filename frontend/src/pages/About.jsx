import { Link } from 'react-router-dom'
import { FaArrowRight, FaBookOpen, FaFeatherAlt, FaRegComments } from 'react-icons/fa'

const values = [
  {
    icon: FaFeatherAlt,
    title: 'Make space for every voice',
    description: 'Good writing comes from all kinds of people. We believe everyone has something worth sharing.',
  },
  {
    icon: FaBookOpen,
    title: 'Stay curious',
    description: 'The best ideas start with an open mind. Read beyond your usual, and keep asking better questions.',
  },
  {
    icon: FaRegComments,
    title: 'Choose connection',
    description: 'Stories help us understand one another. We want every exchange to leave room for respect and discovery.',
  },
]

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="page-width about-hero-content">
        <p className="section-index">A LITTLE ABOUT US</p>
        <h1>Stories make<br />the world <em>feel closer.</em></h1>
        <p className="about-lede">
          BlogHub is an independent-minded home for people who like to share what they know
          and learn from what others see.
        </p>
        <a className="scroll-cue" href="#our-story">
          OUR STORY <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>

    <section className="about-story section-space" id="our-story">
      <div className="page-width about-story-layout">
        <p className="section-index">WHY BLOGHUB</p>
        <div className="about-story-copy">
          <h2 className="section-heading">A small idea with<br /><em>room to grow.</em></h2>
          <p className="body-copy">
            We started with a simple thought: when people have a welcoming place to put their
            ideas into words, everyone gets to see a little more of the world.
          </p>
          <p className="body-copy">
            BlogHub is made for the first-time writer and the lifelong reader, for niche interests
            and big questions. It’s a place to publish at your own pace, follow your curiosity,
            and find the people who care about the things you care about.
          </p>
        </div>
      </div>
    </section>

    <section className="values-section section-space">
      <div className="page-width">
        <p className="section-index">WHAT WE BELIEVE</p>
        <div className="values-heading">
          <h2 className="section-heading">A better space<br /><em>starts with us.</em></h2>
          <p className="body-copy">The kind of community we want to be is shaped by how we show up for one another.</p>
        </div>
        <div className="values-grid">
          {values.map(({ icon: Icon, title, description }, index) => (
            <article className="value-card" key={title}>
              <span className="value-count">0{index + 1}</span>
              <Icon className="value-icon" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="community-section section-space" id="community">
      <div className="page-width community-layout">
        <div>
          <p className="section-index">THERE’S ROOM FOR YOU</p>
          <h2 className="section-heading">Come as you are.<br /><em>Bring an idea.</em></h2>
        </div>
        <div className="community-copy">
          <p className="body-copy">
            You don’t need a perfect plan or a polished first draft. Just bring something you’re
            curious about. We’re glad you found us.
          </p>
          <Link to="/" className="underlined-link">
            Back to the beginning <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default About
