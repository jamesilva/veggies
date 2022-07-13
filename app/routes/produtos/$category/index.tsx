import { Link, useParams } from "@remix-run/react";
import { useMatchesData } from "~/utils";

import type { LoaderData } from "../../produtos";
export default function Category() {
  let { products: productsData } = useMatchesData(
    "routes/produtos"
  ) as LoaderData;
  let category = useParams().category;
  let categoryProduts = productsData.filter(
    (match) => match.category.toLowerCase() == category?.split("-").join(" ")
  );
  return (
    <div>
      {categoryProduts.map((product) => (
        <Link key={product.id} to={product.id}>
          {product.name}
        </Link>
      ))}
    </div>
  );
}
