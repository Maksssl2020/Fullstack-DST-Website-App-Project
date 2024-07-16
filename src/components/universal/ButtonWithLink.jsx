import React from "react";
import { Link } from "react-router-dom";

const ButtonWithLink = ({ title, link, styling }) => {
  return (
    <Link className={styling} to={link}>
      <p>{title}</p>
    </Link>
  );
};

export default ButtonWithLink;
