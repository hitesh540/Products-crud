import { Link } from "react-router-dom";

import AddProductDialog from './AddProductDialog';

const Navbar = () => {

 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light mb-5">
      <div className="container">
        <Link style={{ color: 'blue' }} className="navbar-brand" to="/">
          Products
        </Link>
        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <AddProductDialog/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;