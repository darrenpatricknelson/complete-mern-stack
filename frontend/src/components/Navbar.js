// imports
import { Link } from 'react-router-dom';

// Simple navbar that contains a heading. It's nothing fancy and is just for decoration as I have no other pages to navigate to

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Your Car Database</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
