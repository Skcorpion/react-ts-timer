import { NavLink, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <h1>Hi ᓚᘏᗢ</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="stopwatch">Stopwatch</NavLink>
          </li>
          <li>
            <NavLink to="timer">Timer</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
