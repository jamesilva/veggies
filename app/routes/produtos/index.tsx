import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Link className="block" to="legumes">
        Legumes
      </Link>
      <Link className="block" to="fruta">
        Fruta
      </Link>
      <Link className="block" to="leguminosas">
        Leguminosas
      </Link>
      <Link className="block" to="frutos-secos">
        Frutos Secos
      </Link>
    </div>
  );
}
