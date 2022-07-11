import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useOutlet,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { NavLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import React from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
    },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Vege.tal",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

const variants = {
  visible: { opacity: 1, transition: { duration: 0.6, type: "tween" } },
  hidden: { opacity: 0, transition: { duration: 0.6, type: "tween" } },
};

export default function App() {
  let outlet = useOutlet();
  let loaderData = useLoaderData<LoaderData>();
  let submit = useSubmit();
  const location = useLocation().key;
  const transition = useTransition();
  const targetLocation = React.useRef(location);
  const controls = useAnimation();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (transition.location) {
      targetLocation.current = transition.location.key;
      controls.start("hidden");
    } else if (location === targetLocation.current) {
      targetLocation.current = "";
      setVisible(false);
      controls.set("hidden");
      controls.start("visible");
    }
  }, [transition.location, location, controls]);

  return (
    <html lang="pt-PT" className="h-full overflow-x-hidden overflow-y-scroll">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="fixed z-10 w-full bg-white">
          <nav className="flex flex-col items-center justify-between gap-y-2 py-4 px-[3vw] md:flex-row">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link
                to="/"
                className="mr-8 text-2xl font-bold tracking-tight text-green-900"
              >
                vege.tal
              </Link>
              <button
                className="flex items-center md:hidden"
                type="button"
                aria-label="menu button"
                onClick={() => setVisible((val) => !val)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    visible ? "rotate-90" : ""
                  } h-6 w-6 transition duration-200`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                visible ? "flex" : "hidden"
              } grow flex-col items-center gap-y-3 md:flex md:flex-row`}
            >
              <ul className="flex grow flex-col items-center gap-y-1 transition duration-200 md:flex-row md:space-x-8">
                <li>
                  <NavLink to="/produtos">Produtos</NavLink>
                </li>
                <li>
                  <NavLink to="/about">Sobre Nós</NavLink>
                </li>
                <li>
                  <NavLink to="/contacto">Contacto</NavLink>
                </li>
              </ul>
              {loaderData.user ? (
                <button
                  type="button"
                  className="rounded border border-transparent py-1 px-3 hover:bg-gray-100"
                  onClick={() =>
                    submit(null, { method: "post", action: "logout" })
                  }
                >
                  {loaderData.user.email}
                </button>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="login"
                    className="rounded  py-1 px-3 hover:bg-gray-100"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="join"
                    className="rounded border bg-teal-800 py-1 px-3 text-white hover:bg-teal-700"
                  >
                    Inscrever
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
        <motion.main
          key={location}
          className="h-full pt-16"
          variants={variants}
          initial="hidden"
          animate={controls}
        >
          {outlet}
        </motion.main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
