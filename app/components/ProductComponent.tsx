import type { Product } from "~/models/product.server";

export default function ProductComponent({ product }: { product: Product }) {
  return (
    <article className="flex w-full items-center justify-around gap-x-2">
      <div>
        <h4>{product.name}</h4>
        🥬
      </div>
      <div>
        <p>Quantity: {product.quantity}</p>
        <p>Price: {product.price}</p>
      </div>
    </article>
  );
}
