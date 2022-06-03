function About() {
  return (
    <div className="special-background" >
      <div className="misc-container">
        <h1 className="average">About</h1>
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
          Heavily inspired by the work of creators such as
            <a href="https://www.youtube.com/c/NotJustBikes" className="link-large">
              Not Just Bikes
            </a>
          and 
            <a href="https://www.youtube.com/c/CityNerd" className="link-large">
              CityNerd,
            </a>
          I decided to express this passion through my own medium -- by making a clone of
            <a href="https://medium.com/" className="link-large">
              Medium!
            </a>
        </p>
        <p>
          I chose to highlight the Netherlands in particular because I, like many others, hold their city design and public transit in very high regard.
          Further, I have recently been devoting some time to learning Dutch on the side.
          As a German speaker, I am delighted that I can just mispronounce everything and more or less get by!
        </p>
        <p>
          Jokes aside, I am glad that I was able to make a project that tied together my passion for coding and city design, and I hope you enjoy using the site!
        </p>
      </div>
    </div>
  )
}

export default About;