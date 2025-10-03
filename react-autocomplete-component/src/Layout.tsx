import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <ul className="layout-menu">
        <li>
          <NavLink to="/">Version 1</NavLink>
        </li>
        <li>
          <NavLink to="/version2">Version 2</NavLink>
        </li>
      </ul>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
