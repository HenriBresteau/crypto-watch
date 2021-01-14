import Head from "next/head";
import Layout from "../components/Layout";

export default function Home({ res }) {
  console.log(res);
  return (
    <Layout page="Crypto-watch - Accueil">
      <h1> Accueil </h1>
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
