import React from 'react';
import classes from './Footer.module.css';

const Footer = props => {
  return (
    <footer className={classes.Footer}>
      <p className={classes.copyRight}>
        Made By Bahaa, All Rights Reserved &copy; 2022
      </p>
    </footer>
  );
}

export default Footer;