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
  useLocation,
  useOutlet,
  useSubmit,
  useTransition,
  NavLink,
} from "@remix-run/react";
import React from "react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

// import { motion, useAnimation } from "framer-motion";
import nProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuLink,
  MenuItems,
} from "@reach/menu-button";

import { getUser } from "./session.server";

nProgress.configure({ showSpinner: false, trickleSpeed: 200 });

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
  viewport: "width=device-width,initial-scale=1.0",
  description:
    "Venda de vegetais de mais alta qualidade, com origem 100% natural.",
  keywords: "vegetais, fruta, venda, biológico",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

// const variants = {
//   visible: { opacity: 1, transition: { duration: 0.6, type: "tween" } },
//   hidden: { opacity: 0, transition: { duration: 0.6, type: "tween" } },
// };

export default function App() {
  // let outlet = useOutlet();
  let loaderData = useLoaderData<LoaderData>();
  let submit = useSubmit();
  const location = useLocation().key;
  const transition = useTransition();
  const targetLocation = React.useRef(location);
  // const controls = useAnimation();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (transition.location) {
      targetLocation.current = transition.location.key;
      nProgress.start();
      // controls.start("hidden");
    } else if (location === targetLocation.current) {
      targetLocation.current = "";
      setVisible(false);
      nProgress.done();
      // controls.set("hidden");
      // controls.start("visible");
    }
  }, [transition.location, location]);

  return (
    <html
      lang="pt-PT"
      className="min-h-full overflow-x-hidden overflow-y-scroll"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-full w-full">
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
                aria-label="navigation menu"
                type="button"
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
              } grow flex-col items-center gap-y-4 pt-2 md:flex md:flex-row md:pt-0`}
            >
              <ul className="flex grow flex-col items-center gap-y-3 transition duration-200 md:flex-row md:space-x-8">
                <li>
                  <NavLink
                    to="/produtos"
                    className={({ isActive }) =>
                      isActive ? " text-teal-600" : ""
                    }
                  >
                    Produtos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? " text-teal-600" : ""
                    }
                  >
                    Sobre Nós
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacto"
                    className={({ isActive }) =>
                      isActive ? " text-teal-600" : ""
                    }
                  >
                    Contacto
                  </NavLink>
                </li>
              </ul>
              <div>
                {loaderData.user ? (
                  <UserPopover>
                    <span className="rounded border border-transparent py-1 px-3 hover:bg-gray-100">
                      ⚙
                    </span>
                  </UserPopover>
                ) : (
                  // <button
                  //   type="button"
                  //   className="rounded border border-transparent py-1 px-3 hover:bg-gray-100"
                  //   onClick={() =>
                  //     submit(null, { method: "post", action: "logout" })
                  //   }
                  // >
                  //   {loaderData.user.email}
                  // </button>
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
            </div>
          </nav>
        </div>
        <main className="pt-16 pb-8">
          <Outlet />
        </main>
        {/* <motion.main
          key={location}
          className="pt-16 pb-8"
          variants={variants}
          initial="hidden"
          animate={controls}
        >
          {outlet}
        </motion.main> */}

        <footer className="w-full px-[3vw] py-6">
          <div className="grid grid-cols-1 items-center gap-y-2 gap-x-2 text-center text-sm text-gray-500 md:grid-cols-[1fr,1fr,2fr,1fr,1fr]">
            <Link to="/" className="">
              App Móvel
            </Link>
            <Link to="/" className="">
              Comunidade
            </Link>
            <Link
              to="/"
              className="row-start-1 text-xl font-bold tracking-tight text-green-900 md:col-start-3 "
            >
              vege.tal
            </Link>
            <Link to="/" className="">
              Ajuda
            </Link>
            <Link to="/contacto" className="">
              Contacto
            </Link>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function UserPopover({ children }: { children: React.ReactNode }) {
  let submit = useSubmit();

  return (
    <Menu>
      {({ isExpanded }) => (
        <div className="relative w-full">
          <MenuButton
            className={`flex items-center rounded rounded-b-none text-slate-700 hover:bg-slate-100 focus:bg-slate-100 ${
              isExpanded ? "bg-slate-100" : "bg-white"
            }`}
          >
            {children}
          </MenuButton>
          <MenuPopover
            className="absolute -right-1/2 mt-2 md:right-0"
            portal={false}
          >
            <div className=" rounded-b bg-white focus:outline-none">
              <MenuItems className="flex flex-col gap-y-2 p-2 focus:outline-1">
                <MenuLink
                  as={Link}
                  to="/dashboard"
                  className="flex w-full justify-end rounded p-2 text-sm hover:bg-slate-200"
                >
                  Account
                </MenuLink>
                <MenuItem
                  className="flex w-full cursor-pointer justify-end rounded p-2 text-sm hover:bg-slate-200"
                  onSelect={() =>
                    submit(null, { method: "post", action: "/logout" })
                  }
                >
                  Logout
                </MenuItem>
              </MenuItems>
            </div>
          </MenuPopover>
        </div>
      )}
    </Menu>
  );
}
