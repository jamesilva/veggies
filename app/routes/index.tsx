import { Form, Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  // let { user } = useLoaderData<LoaderData>();
  let user = useOptionalUser();
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

      <section className="grid grid-cols-2 gap-y-8 gap-x-8 px-[3vw] pt-20 pb-10">
        <div className="col-span-2">
          <h2 className="w-1/2 text-3xl leading-[3rem] tracking-tight">
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
          <h3 className="text-lg font-bold tracking-wide ">
            &gt; 80% sustentável{" "}
          </h3>
          <p className="text-sm tracking-wide">
            A nossa infrastrutura alicerça-se na utilização de energias
            renováveis e de produtos não poluentes para o ambiente.
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-wide ">100% pessoal </h3>
          <p className="text-sm tracking-wide">
            Escolha os produtos que quer e espere pela sua chegada ou vá mais a
            fundo e patrocine uma parcela de terra.
          </p>
          <button
            type="button"
            className="rounded border border-teal-900 py-2 px-4 text-sm text-teal-900 hover:shadow-md"
          >
            Saber mais
          </button>
        </div>
      </section>
      <section className="pt-8">
        <article className="grid grid-cols-1 gap-y-4 px-[3vw] py-10 lg:grid-cols-2 lg:gap-x-4">
          <div className="relative order-last flex items-center justify-center rounded-sm border-2 border-teal-800 shadow-sm lg:order-first">
            <img
              className="block max-h-96 object-cover"
              src="pexels-greta-hoffman-7728345.jpg"
              alt="agricultorres carregando um carrinho de mão"
              width={1280}
              height={853}
            />
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-10"></div>
          </div>
          <div className="flex flex-col justify-center gap-y-4 lg:pl-4">
            <h3 className="text-lg font-bold tracking-wide ">
              Eles sabem o que fazem
            </h3>
            <p className="text-sm tracking-wide">
              Os nossos agricultores trabalham o campo há mais de 15 anos.
              Aproveitam a terra como nenhum outro, acompanhados por engenheiros
              biológicos que também se juntam ao nosso projeto.
            </p>
          </div>
        </article>
        <article className="grid grid-cols-1 gap-y-4 bg-[#80bbae37] px-[3vw] py-10 lg:grid-cols-2 lg:gap-x-4">
          <div className="flex flex-col justify-center gap-y-4 pr-8">
            <h3 className="text-lg font-bold tracking-wide ">No tempo certo</h3>
            <p className="text-sm tracking-wide">
              Os produtos que disponibilizamos nosso catálogo variam conforme a
              estação do ano! Como praticamos uma agricultura biológica e
              natural, a maturação dos vegetais é dependente da sua época de
              colheita.
            </p>
          </div>
          <div className="relative flex items-center justify-center rounded-sm border-2 border-teal-800 shadow-sm">
            <img
              className="block max-h-96 object-cover"
              src="pexels-quang-nguyen-vinh-2135677.jpg"
              alt="agricultorres carregando um carrinho de mão"
              width={1920}
              height={1280}
            />
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-20"></div>
          </div>
        </article>
      </section>
      <section className="flex flex-col items-center justify-center gap-y-4 px-[3vw] pt-24 pb-10">
        <h2 className="text-center text-2xl tracking-tight">
          Faça parte da mudança necessária
        </h2>
        <p className="text-center text-gray-700">
          Ajude a proteger o futuro do planeta e a promover a sua terra e os
          seus habitantes
        </p>
        <span className="text-xl" aria-hidden={true}>
          🌼
        </span>
      </section>
      <section className="grid grid-cols-1 gap-y-4 py-10 px-[3vw] lg:grid-cols-[2fr,1fr] lg:grid-rows-[auto,1fr] lg:gap-x-4 ">
        <div className="space-y-3 lg:row-span-1">
          <q className="text-center text-xl lg:text-left">
            Criei este projeto pois acredito que reduzir a distância entre
            consumidores e produtores é um dos principais métodos que temos para
            reduzir o desperdício e, ao mesmo tempo, fomentar relações entre
            pessoas e com a natureza.
          </q>
          <br />
          <p className="w-full  text-base">Janine Ferreira, Fundadora</p>
        </div>
        <div className=" w-full lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <img
            src="pexels-tim-douglas-6205523.jpg"
            alt="mulher a sorrir"
            width={640}
            height={878}
            className="mx-auto block max-h-[75vh] min-h-[50vh] rounded border border-teal-800 object-cover "
          />
        </div>
        {user ? null : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 lg:row-span-1">
            <Form method="post" action="join" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-teal-600  py-2 px-4 text-white hover:bg-teal-700 focus:bg-teal-500"
              >
                Criar Conta
              </button>
            </Form>
          </div>
        )}
      </section>
    </>
  );
}
