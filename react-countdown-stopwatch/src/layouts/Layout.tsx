import React from "react";
import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="main">
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Count Down</NavLink>
          </li>
          <li>
            <NavLink to={"/stop-watch"}>Stop Watch</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
