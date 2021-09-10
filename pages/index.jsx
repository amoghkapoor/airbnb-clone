import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import {auth} from "google-auth-library"
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import HostingCard from '../components/HostingCard'
import Footer from '../components/Footer'

export default function Home({exploreData, cardsData}) {
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
  // Base Configurations and Credentials
  const keysEnvVar = process.env['CREDS']
  const keys = JSON.parse(keysEnvVar)
  const client = auth.fromJSON(keys)
  client.scopes = ['https://www.googleapis.com/auth/spreadsheets']
  let baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values`

  // Small Card Data
  let small_cards_url = `${baseUrl}/small_cards!A1:D9`
  const small_cards_response = await client.request({url: small_cards_url})
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

  // Medium Card Data
  let medium_cards_url = `${baseUrl}/medium_cards!A1:C5`
  const medium_cards_response = await client.request({url: medium_cards_url})
  medium_cards_response.data.values.shift();
  const medium_cards_data = medium_cards_response.data.values
  let cardsData = medium_cards_data.map(item => {
      return {
        id: item[0],
        category: item[1],
        image: item[2]
      }
    })

  // Return props 
  return{
    props: {
      exploreData,
      cardsData
    }
  }
}