import { Link } from "@remix-run/react";

import legumes from "~/assets/pexels-daria-shevtsova.webp";
import fruta from "~/assets/pexels-elizabeth-tr-armstrong-635705.webp";
import leguminosas from "~/assets/pexels-min-an-1638523.webp";
import frutosSecos from "~/assets/pexels-arina-krasnikova-6316685.webp";

export default function Index() {
  return (
    <div className="grid grid-cols-1 gap-y-4 gap-x-4 lg:grid-cols-2">
      <ProductCard img={legumes} height="1920" width="1280" alt="legumes">
        <Link
          to="legumes"
          className="text-2xl font-semibold uppercase tracking-widest text-white"
        >
          Legumes
        </Link>
      </ProductCard>
      <ProductCard img={fruta} width="1279" height="829" alt="fruta">
        <Link
          className="text-2xl font-semibold uppercase tracking-widest text-white"
          to="fruta"
        >
          Fruta
        </Link>
      </ProductCard>
      <ProductCard
        img={leguminosas}
        width="1924"
        height="1280"
        alt="leguminosas"
      >
        <Link
          className="text-2xl font-semibold uppercase tracking-widest text-white"
          to="leguminosas"
        >
          Leguminosas
        </Link>
      </ProductCard>
      <ProductCard
        img={frutosSecos}
        height="1918"
        width="1280"
        alt="frutos secos"
      >
        <Link
          className="text-2xl font-semibold uppercase tracking-widest text-white"
          to="frutos-secos"
        >
          Frutos Secos
        </Link>
      </ProductCard>
    </div>
  );
}

function ProductCard({
  img,
  alt,
  width,
  height,
  children,
}: {
  img: string;
  width: string;
  alt: string;
  height: string;
  children: React.ReactNode;
}) {
  return (
    <article className="group relative max-h-96 overflow-clip rounded-sm border border-teal-800 hover:shadow-sm">
      <img
        src={img}
        alt={alt}
        width={width}
        height={height}
        className="block h-full object-cover duration-300 group-hover:scale-105"
      />
      <div className="absolute top-0 left-0 flex h-full w-full bg-black opacity-50 group-hover:opacity-40"></div>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </article>
  );
}
