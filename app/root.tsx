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
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { NavLink } from "react-router-dom";
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
    { rel: "stylesheet", href: nProgressStyles },
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

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });
export default function App() {
  let loaderData = useLoaderData<LoaderData>();
  let submit = useSubmit();
  let transition = useTransition();

  React.useEffect(() => {
    if (transition.state === "idle") NProgress.done();
    else NProgress.start();
  }, [transition.state]);

  return (
    <html lang="pt-PT" className="h-full overflow-x-hidden overflow-y-scroll">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full ">
        <div className="fixed z-10 w-full bg-white">
          <nav className="flex items-center justify-between py-4 px-[3vw]">
            <Link
              to="/"
              className="mr-8 text-2xl font-bold tracking-tight text-green-900"
            >
              vege.tal
            </Link>
            <ul className="hidden grow space-x-8 lg:flex">
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
          </nav>
        </div>
        <main className="h-full pt-16">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
