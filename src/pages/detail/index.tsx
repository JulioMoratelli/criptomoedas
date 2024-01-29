/* eslint-disable prefer-const */
import { useNavigate, useParams } from 'react-router-dom'
import styles from './detail.module.css'
import { useEffect, useState } from 'react';
import { NotFound } from '../notfound';


interface CoinProp {
  id: string;
  name: string;
  image: string;
  current_price: string;
  symbol: string;
  market_cap: string;
  high_24h: string;
  low_24h: string;
  formatedPrice: string;
  market_cap_change_percentage_24h: number;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  formatedMarketcap: string;
}



export function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${cripto}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=pt`)
        .then(response => response.json())
        .then((data: CoinProp[]) => {

          const newData = data[0];


          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          })

          const resultData = {
            ...newData,
            formatedPrice: price.format(Number(newData.current_price)),
            formatedLowPrice: price.format(Number(newData.low_24h)),
            formatedMarketcap: price.format(Number(newData.market_cap)),
            formatedHighPrice: price.format(Number(newData.high_24h))
          }

          setDetail(resultData);
          setLoading(false);
        })
        .catch(error => {
          navigate("/*")
          setLoading(false);
        })

    }
    getData();
  }, [cripto])

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando Informações...</h4>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.divImg}>
        <img className={styles.center} src={detail?.image} width='256px' height='256px' alt="" />
      </div>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.content}>
        <p>
          <strong>Preço: </strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maio Preço 24h: </strong> {detail?.formatedHighPrice}
        </p>
        <p>
          <strong>Menor Preço 24h: </strong> {detail?.formatedLowPrice}
        </p>
        <p>
          <strong>Variação 24h: </strong>
          <span className={Number(detail?.market_cap_change_percentage_24h) >= 0 ? styles.profit : styles.loss}>
            {detail?.market_cap_change_percentage_24h}
          </span>
        </p>
        <p>
          <strong>Valor Mercado: </strong> {detail?.formatedMarketcap}
        </p>
      </section>
    </div >
  )
}