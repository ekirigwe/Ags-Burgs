import React from "react";
import classes from "./Hamburger.css";

const hamburger = (props) => (
  <div className={classes.DrawerToggle} onClick={props.open}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default hamburger;
