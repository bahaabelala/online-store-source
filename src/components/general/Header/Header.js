import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Search from "./Search/Search";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const Header = props => {
  const [headerClasses, setHeaderClasses] = useState([classes.Header]),
    [navItems, setNavItems] = useState(null),
    [navClasses, setNavClasses] = useState([classes.navigation]);

  useEffect(() => {
    // ^ Changing the properties of the HEADER while scrolling
    if (props.scrolled) {
      setHeaderClasses(headClasses => {
        headClasses.push(classes.headerScrolled);
        return headClasses;
      });
    } else {
      setHeaderClasses([classes.Header]);
    }

    // ^ Updating UI depending on auth state
    if (!props.isRegistered) {
      // ^ For a non-registered person
      setNavItems(
        <Link to="/register/signin">
          <i className="ri-login-circle-line" title='Login'></i>
        </Link>
      );
    } else {
      if (props.userRole === "user") {
        // ^ For a NORMAL USER
        setNavItems(
          <Aux>
            <Link to="/profile/show">
              <i className="ri-user-line" title='Profile'></i>
            </Link>
            <Link to="/signout">
              <i className="ri-logout-circle-r-line" title='Logout'></i>
            </Link>
          </Aux>
        );
      } else {
        // ^ For an ADMIN
        setNavItems(
          <Aux>
            <Link to="/profile/show">
              <i className="ri-user-line" title='Profile'></i>
            </Link>
            <Link to="/admin">
              <i className="ri-admin-line" title='Admin Dashboard'></i>
            </Link>
            <Link to="/signout">
              <i className="ri-logout-circle-r-line" title='Logout'></i>
            </Link>
          </Aux>
        );
      }
    }
  }, [props.scrolled, props.isRegistered]);


  // Handling opening the navigation
  const handleOpenNav = () => {
    setNavClasses(cls => {
      const  newClasses = [...cls];
      newClasses.push(classes.activeNav)
      return newClasses;
    });
  }

  // Handling opening the navigation
  const handleCloseNav = () => {
    setNavClasses([classes.navigation]);
  }


  return (
    <header className={headerClasses.join(" ")}>
      <h1 className={classes.title}>
        <Link to="/">Online Store</Link>
      </h1>

      <div
        className={[classes.hamburger, classes.openHamburger].join(' ')}
        onClick={handleOpenNav}>
        <i className={`ri-arrow-left-s-line`}></i>
      </div>

      <nav className={navClasses.join(' ')}>
        <Search />
        <Link to="/cart">
          <i className="ri-shopping-cart-2-line" title='Cart'></i>
        </Link>
        {navItems}

        <div
          className={[classes.hamburger, classes.closeHamburger].join(' ')}
          onClick={handleCloseNav}>
          <i className={`ri-arrow-right-s-line`}></i>
        </div>
      </nav>

      
    </header>
  );
};

export default React.memo(Header);
