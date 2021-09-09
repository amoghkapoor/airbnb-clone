import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { google } from "googleapis"
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import HostingCard from '../components/HostingCard'
import Footer from '../components/Footer'

export default function Home({ exploreData, cardsData }) {
  return (
    <div>
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/airbnb-cereal-app" rel="stylesheet"></link>
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-0 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(item => {
              return (
                <SmallCard key={item.id} img={item.image} duration={item.duration} location={item.location} />
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 -mr-3">
          {cardsData?.map(item => {
            return(
              <MediumCard key={item.id} image={item.image} category={item.category}/>
            )
          })}
          </div>
        </section>

        <section>
          <HostingCard/>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

export async function getStaticProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const small_cards_response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'small_cards!A1:D9',
  });

  small_cards_response.data.values.shift();

  const small_cards_data = small_cards_response.data.values

  let exploreData = small_cards_data.map(item => {
    return {
      id: item[0],
      location: item[1],
      duration: item[2],
      image: item[3]
    }
  })

  const medium_cards_response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'medium_cards!A1:C5'
  })

  medium_cards_response.data.values.shift()

  const medium_cards_data = medium_cards_response.data.values

  let cardsData = medium_cards_data.map(item => {
    return {
      id: item[0],
      category: item[1],
      image: item[2]
    }
  })

  return {
    props: {
      exploreData,
      cardsData
    },
  };
}