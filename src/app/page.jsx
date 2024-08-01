import stiles from "@/app/page.module.scss"
import ListValute from "@/components/ListValute/ListValute";
import ValuteSearch from "@/components/ValuteSearch/ValuteSearch";
import React from "react";

async function ListValut(baseCurrency) {
  // const url = ""
  const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;
  const dataArr = []

  const d = await fetch(url, {
    cache: 'no-store'
  })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        const rates = data.rates;
        Object.keys(rates).map(val => {
          const rate = rates[val];
          const invertedRate = (1 / rate).toFixed(2);
          dataArr.push({ key: val, valRate: invertedRate, baseCurrency: baseCurrency, rate: rate })
          // console.log(`1 ${val} = ${invertedRate} ${baseCurrency}`);
        })
        // Выберите нужные валюты для отображения

      } else {
        console.error("Ошибка получения данных:", data["error-type"]);
      }
    })
    .catch(error => console.error("Ошибка запроса:", error));

  return dataArr

}

const Home = async ({ searchParams }) => {

  const param = searchParams
  const data = await ListValut(param.valute)

  return (
    <main className={stiles.main}>
      <aside className="">
        <ValuteSearch />
      </aside>
      <article>
        <ListValute data={data} />
      </article>
    </main >
  );
}


export default Home