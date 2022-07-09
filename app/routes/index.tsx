import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/session.server";

// import { useOptionalUser } from "~/utils";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return json<LoaderData>({ user });
};

export default function Index() {
  let { user } = useLoaderData<LoaderData>();

  return (
    <>
      <section className="relative">
        <video autoPlay muted loop className="w-full">
          <source src="pexels-karolina-grabowska-5243381.mp4" />
        </video>
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-70"></div>
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-10 text-3xl font-semibold text-white">
            Da nossa mão para a sua.
          </h1>
          {user ? null : (
            <Link
              to="join"
              className="rounded bg-teal-700 py-1 px-3 tracking-wider text-white hover:bg-teal-600"
            >
              Criar Conta
            </Link>
          )}
        </div>
        <div className="absolute bottom-[1px] right-[2px]" aria-hidden>
          <p className="text-xs text-gray-400">Karolina Grabowska</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-y-8 gap-x-8 py-20 px-[3vw]">
        <div className="col-span-2">
          <h2 className="w-1/2 text-2xl font-medium">
            Ingredientes frescos e naturais à distância de um clique
          </h2>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-wide">100% natural </h3>
          <p className="text-sm tracking-wide">
            Todos os nossos produtos são de origem 100% natural, sem aditivos
            químicos.
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-wide ">100% local </h3>
          <p className="text-sm tracking-wide">
            Desde os agricultores até aos distribuidores, toda a cadeia de
            produção é baseada na nossa região
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-wide ">100% local </h3>
          <p className="text-sm tracking-wide">
            Desde os agricultores até aos distribuidores, toda a cadeia de
            produção é baseada na nossa região
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-wide ">100% local </h3>
          <p className="text-sm tracking-wide">
            Desde os agricultores até aos distribuidores, toda a cadeia de
            produção é baseada na nossa região
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
      </section>
      <section className="space-y-16 py-20 px-[3vw] ">
        <article className="grid grid-cols-2 gap-x-8">
          <img
            className="rounded"
            src="pexels-greta-hoffman-7728353.jpg"
            alt="agricultorres carregando um carrinho de mão"
          />
          <div className="flex flex-col justify-center gap-y-4">
            <h3 className="text-lg font-bold tracking-wide ">
              Eles sabem o que fazem
            </h3>
            <p className="text-sm tracking-wide">
              Os nossos agricultores trabalham o campo há mais de 20 anos.
              Aproveitam a terra como nenhum outro, acompanhados por engenheiros
              biológicos que também se juntam ao nosso projeto
            </p>
          </div>
        </article>
        <article className="grid  grid-cols-2 gap-x-8">
          <div className="flex flex-col justify-center gap-y-4">
            <h3 className="text-lg font-bold tracking-wide ">
              Eles sabem o que fazem
            </h3>
            <p className="text-sm tracking-wide">
              Os nossos agricultores trabalham o campo há mais de 20 anos.
              Aproveitam a terra como nenhum outro, acompanhados por engenheiros
              biológicos que também se juntam ao nosso projeto
            </p>
          </div>
          <img
            className=" rounded"
            src="pexels-greta-hoffman-7728353.jpg"
            alt="agricultorres carregando um carrinho de mão"
          />
        </article>
      </section>
    </>
  );
}
