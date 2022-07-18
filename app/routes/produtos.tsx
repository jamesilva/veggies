import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, Outlet, useParams } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";

export type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export let loader: LoaderFunction = async () => {
  return { products: await getAllProducts() };
};

export let meta: MetaFunction = () => ({
  title: "Vege.tal - Produtos",
});

export default function Products() {
  let { category } = useParams();

  return (
    <section className="px-[3vw]">
      <header className="py-4 md:col-start-2">
        <ol className="inline-flex gap-x-4">
          <li>
            <Link to=".">Categorias</Link>
          </li>
          {category ? (
            <li>
              {" "}
              <Link className="capitalize" to={`${category}`}>
                {category}
              </Link>
            </li>
          ) : null}
        </ol>
      </header>
      <Outlet />
    </section>
  );
}
