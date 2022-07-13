import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";
import ProductComponent from "~/components/ProductComponent";

type LoaderData = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export let loader: LoaderFunction = async ({ request }) => {
  return { products: await getAllProducts() };
};

export default function Products() {
  let loaderData = useLoaderData<LoaderData>();

  return (
    <>
      <section className="grid grid-cols-1 gap-x-4 gap-y-4 px-[3vw] md:grid-cols-[200px,1fr]">
        <header className="py-4 md:col-start-2">
          {useLocation().pathname}
        </header>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full rounded bg-teal-50 p-1"
            placeholder="Procurar..."
          />
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className=" text-teal-900">Categoria</h3>
              <ul className="space-y-1 indent-1 text-sm text-gray-600">
                <li>
                  <Link to="legumes">Legumes</Link>
                </li>
                <li>
                  <Link to="fruta">Fruta</Link>
                </li>
                <li>
                  <Link to="leguminosas">Leguminosas</Link>
                </li>
                <li>
                  <Link to="frutos-secos">Frutos Secos</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-1">
              <label htmlFor="price" className="block text-teal-900">
                Preço
              </label>
              <input
                type="range"
                name="price"
                id="price"
                min={0}
                className="appearance-none rounded-full bg-teal-50 px-1"
              />
            </div>
          </div>
        </div>
        <div className="border">
          {loaderData?.products?.map((product) => {
            return <ProductComponent key={product.id} product={product} />;
          })}
        </div>
      </section>
    </>
  );
}
