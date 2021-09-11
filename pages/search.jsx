import Header from "../components/Header"
import Footer from "../components/Footer"
import InfoCard from '../components/InfoCard'
import Head from 'next/head'
import { useRouter } from "next/dist/client/router"
import _ from 'lodash'
import {format} from "date-fns"
// import {auth} from "google-auth-library"

const search = ({searchResults}) => {
    const router = useRouter()
    console.log(router.query)
    const {location, startDate, endDate, numberOfGuests} = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = ` ${formattedStartDate} - ${formattedEndDate}`
    return (
        <>
        <Head>
            <title>Airbnb Clone</title>
            <link rel="icon" href="/airbnb-logo.ico" />
            <link href="http://fonts.cdnfonts.com/css/airbnb-cereal-app" rel="stylesheet"></link>
        </Head>

        <div className="">
            <Header placeholder={`${location} | ${range} | ${numberOfGuests}`}/>

                <main className="flex">
                    <section className="flex-grow pt-14 px-6">
                        <p className="text-xs">300+ stays &bull; {range}  &bull; {numberOfGuests} {numberOfGuests === 1 ? `Guest` : `Guest` }</p>
                        <h1 className="text-3xl font-semibold mt-2 mb-6 ">Stays in {_.capitalize(location)}</h1>

                        <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Cancellation Flexibility</p>
                            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Type of Place</p>
                            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Price</p>
                            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Rooms and Beds</p>
                            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">More</p>
                        </div>

                        <div className="flex flex-col">
                            {searchResults.map(item => {
                                return(
                                    <InfoCard 
                                    key={item.img}
                                    image={item.img} 
                                    price={item.price}
                                    star={item.star} 
                                    total={item.total} 
                                    title={item.title}
                                    location={item.location}
                                    description={item.description} />
                                )
                            })}
                        </div>
                    </section>
                </main>
            <Footer/>
        </div>
        </>
    )
}

export default search


export async function getServerSideProps() {
    // Base Configurations and Credentials
    // const keysEnvVar = process.env['CREDS']
    // const keys = JSON.parse(keysEnvVar)
    // const client = auth.fromJSON(keys)
    // client.scopes = ['https://www.googleapis.com/auth/spreadsheets']
    // let baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values`

    // demo
    //TODO: will update my own data later on
    const searchResults = await fetch('https://links.papareact.com/isz')
    .then(response => response.json())

    return{
        props:{
            searchResults
        }
    }
}
