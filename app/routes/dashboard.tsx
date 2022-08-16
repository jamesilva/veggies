import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";

import { getProducerItems } from "~/models/product.server";
import { requireUserId } from "~/session.server";

type LoaderData = Awaited<ReturnType<typeof getProducerItems>>;

export let loader: LoaderFunction = async ({ request }) => {
  let userId = await requireUserId(request);
  let products = await getProducerItems(userId);
  return json(products);
};

export default function DashBoard() {
  let loaderData = useLoaderData<LoaderData>();

  return (
    <section className="px-[3vw]">
      {loaderData ? (
        <ul>
          {loaderData.map((e) => (
            <li key={e.id}>
              <Link
                to={`/produtos/${e.category
                  .toLowerCase()
                  .split(" ")
                  .join("-")}/${e.id}`}
                className="hover:text-teal-600"
              >
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No item</h3>
      )}
    </section>
  );
}
