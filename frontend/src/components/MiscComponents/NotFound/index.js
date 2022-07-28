// External modules
import { Link } from "react-router-dom";

// Internal modules
import './NotFound.css';

function NotFound({ text }) {
  return (
    <div className="special-background" >
      <div className="misc-container">
        <h1 className="garamond">{text}</h1>
        <Link to='/' className="link">
          Return to home page
        </Link>
      </div>
    </div>
  )
}

export default NotFound;