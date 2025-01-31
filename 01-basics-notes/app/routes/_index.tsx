import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import pageStyles from "~/styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never lose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try now!</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: pageStyles,
  },
];
