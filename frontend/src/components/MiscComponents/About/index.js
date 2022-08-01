// External modules
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="special-background" >
      <div className="misc-container">
        <h1 className="garamond">About</h1>
        <div className="buttons-holder" >
          <a href="https://github.com/connorwfitch/react-solo-project" className="link">
            Project Repo
          </a>
          <a href="https://github.com/connorwfitch" className="link">
            My GitHub
          </a>
          <a href="https://www.linkedin.com/in/connor-fitch-241678159/" className="link">
            My LinkedIn
          </a>
        </div>
        <p>
          Hi, I am Connor Fitch, a software engineer who is passionate about city design, accessibility, public transit, and climate policy.
          Accordingly, I admire the Netherlands for their forward thinking policies in those areas.
        </p>
        <p>
          I am also interested in learning other languages and have taken up Dutch as my most recent challenge.
          Thankfully, as a German speaker, I know I can just mispronounce what I want to say in German and know
          that I more or less got the point across!
        </p>
        <p>
          Jokes aside, I am glad that I was able to make a project that tied together my passions for coding, city design, and language learning. I hope you enjoy using the site!
        </p>
        <Link to='/' className="link">
          Return to home page
        </Link>
      </div>
    </div>
  )
}

export default About;