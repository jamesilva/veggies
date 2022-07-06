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
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { NavLink } from "react-router-dom";

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

export default function App() {
  return (
    <html lang="pt-PT" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center py-4 px-[3vw] xl:px-0">
            <Link
              to="/"
              className="mr-8 text-2xl font-bold tracking-tight text-green-900"
            >
              vege.tal
            </Link>
            <ul className="hidden space-x-8 lg:flex ">
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
            <div className="ml-auto flex space-x-4">
              <Link to="login" className="rounded border py-1 px-3">
                Entrar
              </Link>
              <Link
                to="join"
                className="rounded border bg-teal-800 py-1 px-3 text-white"
              >
                Inscrever
              </Link>
            </div>
          </nav>
        </div>
        <main className="mx-auto max-w-7xl">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
