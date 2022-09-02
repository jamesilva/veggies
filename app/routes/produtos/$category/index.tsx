import { Link, useParams } from "@remix-run/react";
import { useMatchesData } from "~/utils";

import type { LoaderData } from "../../produtos";

import alface from "~/assets/pexels-lilartsy-3016319.webp";
import batatas from "~/assets/pexels-marco-antonio-victorino-2286776.webp";

export default function Category() {
  let { products: productsData } = useMatchesData(
    "routes/produtos"
  ) as LoaderData;
  let category = useParams().category;
  let categoryProduts = productsData.filter(
    (match) => match.category.toLowerCase() == category?.split("-").join(" ")
  );
  return (
    <div className="grid grid-cols-4 gap-x-4">
      {categoryProduts.map((product) => (
        <Link key={product.id} to={product.id}>
          <div className="overflow-clip">
            <img
              src={product.name === "Alface" ? alface : batatas}
              alt="alface"
              className="rounded object-cover transition-transform duration-150 hover:scale-105"
              width={600}
              height={600}
            />
          </div>
          <span>{product.name}</span>
        </Link>
      ))}
    </div>
  );
}
