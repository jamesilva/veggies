import type { Product } from "~/models/product.server";

export default function ProductComponent({ product }: { product: Product }) {
  return (
    <article className="flex gap-x-2">
      <h4>{product.name}</h4>
      <div>
        <p>Quantity: {product.quantity}</p>
        <p>Price: {product.price}</p>
      </div>
    </article>
  );
}
