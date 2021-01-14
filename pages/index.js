import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ res }) {
  return (
    <Layout page="Crypto-watch - Accueil">
      <ul className="flex justify-around py-10">
        {res.map((crypto, index) => (
          <li
            key={index}
            className="relative hover:shadow-md p-8 border border-blue-300 rounded-3xl bg-blue-100 md:w-auto flex-1 mx-5"
          >
            <Link href="/">
              <a href="" className="rounded-md">
                <div className="text-center">
                  <img
                    src={crypto.logo_url}
                    alt={crypto.name}
                    className="w-20 h-20 mx-auto mb-6"
                  />
                </div>
                <h2 className="text-2xl mb-6 uppercase tracking-wider">
                  {crypto.name}
                </h2>
                <h3 className="font-bold text-2xl mb-4">
                  {parseFloat(crypto.price).toFixed(2)} €
                </h3>
                <p className="text-2xl mb-4">
                  Rank : <span className="font-bold">{crypto.rank} </span>
                  {crypto.rank <= 1 ? (
                    <span>&#129351;</span>
                  ) : (
                    <span>&#129353;</span>
                  )}
                </p>
                <p>
                  1 jour :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["1d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}{" "}
                  </span>
                  {crypto["1d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 mois :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["30d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}{" "}
                  </span>
                  {crypto["30d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p>
                  1 an :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto["365d"].price_change_pct * 100).toFixed(
                      2
                    ) + "%"}{" "}
                  </span>
                  {crypto["365d"].price_change_pct < 0 ? (
                    <span className="text-red-500"> &#x2798;</span>
                  ) : (
                    <span className="text-green-500"> &#x279A;</span>
                  )}
                </p>
                <p className="text-2xl my-4">
                  High :{" "}
                  <span className="font-bold">
                    {parseFloat(crypto.high).toFixed(2)}
                  </span>
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=9fe6bb793d88777ef7d1270f6f4ffed4&ids=BTC,ETH,RVN&interval=1d,30d,365d&convert=EUR"
    ).then((res) => res.json());
    return {
      props: { res },
    };
  } catch (error) {
    console.log(error);
  }
}
