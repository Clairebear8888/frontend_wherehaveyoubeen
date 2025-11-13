import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/countries/new">✈️ Add Country</Link>
    </nav>
  );
}

export default Navbar;
