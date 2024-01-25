/* eslint-disable prefer-const */
import { BiSearch } from 'react-icons/bi'
import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

//https://coinlib.io/api/v1/coinlist?key=b402ee8fd0080fa2

interface CoinProps {
  id: string;
  name: string;
  image: string;
  price_change_percentage_24h: string;
  current_price: string;
  symbol: string;
  market_cap_change_percentage_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedSymbol: string;
}


export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();


  useEffect(() => {
    async function getData() {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=pt')
        .then(response => response.json())
        .then((data) => {
          let dataCoins = data.slice(0, 15)

          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          })


          const formatResult = dataCoins.map((item: CoinProps) => {
            const formated = {
              ...item,
              price_change_percentage_24h: item.price_change_percentage_24h,
              formatedPrice: price.format(Number(item.current_price)),
              formatedMarket: price.format(Number(item.market_cap)),
              formatedSymbol: item.symbol.toUpperCase(),
            }

            return formated;
          })

          setCoins(formatResult);
        })
    }

    getData();
  }, [])


  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (inputValue === "") return;

    navigate(`/detail/${inputValue}`)
  }


  return (
    <main className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Digite o simbolo da moeda: BTC...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type='submit'>
          <BiSearch size={30} color='#fff' />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor Mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>

        <tbody>
          {coins.map(coin =>
          (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.id}`}>
                  <img src={coin.image} width='30px' height='30px' alt="" />
                  <span>{coin.name}</span> | {coin.formatedSymbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td className={+coin?.price_change_percentage_24h >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                <span>{coin.price_change_percentage_24h}</span>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </main >
  )
}