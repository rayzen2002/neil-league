import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-16 h-[500] w-full bg-blitz-100 px-6">
      <h1 className="py-16 text-center font-alt text-5xl font-bold leading-snug">
        Seja bem-vindo ao site da{" "}
        <a
          href="https://www.faceit.com/en/hub/63ff8232-ec1b-4b18-86c1-1bd131288be1/NEIL%20-%20Nordeste%20Inhouse%20League"
          className="text-orange-500"
        >
          NEIL{" "}
        </a>{" "}
        Inhouse League!
      </h1>
      <p className=" px-28 pb-20 text-center text-start font-sans text-xl leading-relaxed">
        Somos uma liga de Dota 2 que começou como uma brincadeira entre amigos,
        mas rapidamente se tornou a forma mais divertida de jogar Dota.
        <br /> Ao longo dos anos, nos tornamos a liga mais duradoura de Dota 2
        do mundo, com 12 temporadas já concluídas e atualmente na emocionante
        13ª temporada. Nossa jornada tem sido incrível, e estamos orgulhosos de
        ter construído uma comunidade apaixonada ao redor do contexto da NEIL. O
        que antes era exclusivo da Paraíba, agora abrange jogadores de todo o
        Brasil. <br />
        Estamos emocionados em ver como a liga cresceu e se tornou uma
        verdadeira celebração do Dota 2. Para tornar tudo ainda mais
        emocionante, oferecemos premiações mensais para os participantes,
        reconhecendo seu talento e dedicação. Além disso, recentemente lançamos
        a NEIL Liga Academy, uma iniciativa que visa abranger ainda mais a
        comunidade que se formou ao nosso redor. Aqui, todos são bem-vindos,
        independentemente do seu nível de habilidade. Nossa liga é um lugar para
        se divertir, aprender, fazer novas amizades e compartilhar a paixão pelo
        Dota 2. Navegue pelo nosso site para descobrir mais informações sobre a
        liga, as temporadas passadas, os jogadores e as premiações. Junte-se a
        nós nesta jornada incrível e faça parte da comunidade NEIL Inhouse
        League! Que a batalha nos campos de Dota 2 continue a nos unir e
        proporcionar momentos inesquecíveis! Divirta-se e boa sorte!
      </p>
    </div>
  );
}
