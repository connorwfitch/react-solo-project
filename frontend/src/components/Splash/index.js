// External modules
import { Link } from 'react-router-dom';

// Internal modules
import './Splash.css';

function Splash() {
  return (
    <div className='main flex-col-20'>
      <h1 className='splash garamond'>Blijf nieuwsgierig.</h1>
      <h5 className='normal'>Discover the Netherlands, Dutch culture, and much more.</h5>
      <Link to='/stories' className='button orange'>
        Start reading
      </Link>
      <img src='https://fullsuitcase.com/wp-content/uploads/2020/12/Two-days-in-Amsterdam-Netherlands.jpg'
        alt='Amsterdam Canal'
        className='splash-image'
      >
      </img>
    </div>
    
  )
}

export default Splash;