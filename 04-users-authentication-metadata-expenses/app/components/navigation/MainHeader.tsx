import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
  const userId: string = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="delete" id="logout-form" action="/logout">
                <button className="cta">Logout</button>
              </Form>
            )}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
