import { useParams } from 'react-router-dom'
import styles from './detail.module.css'
import { useEffect } from 'react';


interface CoinProp {
  id: string;
  name: string;
  image: string;
  price_change_percentage_24h: string;
  current_price: string;
  symbol: string;
  market_cap_change_percentage_24h: string;
  market_cap_change_24h: string;
  high_24h: string;
  low_24h: string
  formatedPrice: string;
  formatedMarket: string;
  formatedSymbol: string;
}



export function Detail() {
  const { cripto } = useParams();

  useEffect(() => {
    function getData() {
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${cripto}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=pt`)
        .then(response => response.json()
          .then((data) => {

            let price = Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            })


          })
        )
    }

    getData();
  }, [cripto])

  return (
    <div>
      <h1>Pagina Detalhes {cripto}</h1>
    </div>
  )
}