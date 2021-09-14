import Header from "../../components/Header"
import Footer from "../../components/Footer"
import InfoCard from '../../components/InfoCard'
import Head from 'next/head'
import { useRouter } from "next/dist/client/router"
import _ from 'lodash'
import {format} from "date-fns"
import Map from "../../components/Map"
import {auth} from "google-auth-library"

const search = ({searchResults, data}) => {
    const router = useRouter()
    const {location, startDate, endDate, numberOfGuests} = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = ` ${formattedStartDate} - ${formattedEndDate}`
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    let timeDifference = date2.getTime() - date1.getTime()
    timeDifference === 0 ? timeDifference = (1000 * 3600 * 24) : timeDifference
    let days = timeDifference / (1000 * 3600 * 24)
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
                            {/* {searchResults.map(item => {
                                return(
                                    <InfoCard 
                                    key={item.img}
                                    image={item.img} 
                                    price={item.price}
                                    star={item.star} 
                                    total={item.total} 
                                    title={item.title}
                                    location={item.location}
                                    description={item.description}
                                    days={days} />
                                )
                            })} */}
                            {data.map(item =>
                                {
                                    return(
                                        <InfoCard 
                                        key={item.id}
                                        image={item.image}
                                        price={item.price}
                                        title={item.name}
                                        room_type={item.room_type}
                                        days={days}
                                        accommodates={item.accommodates}
                                        bedrooms={item.bedrooms}
                                        bathrooms={item.bathrooms}
                                        beds={item.beds}
                                        amenities={item.amenities}
                                        />
                                    )
                                })}
                        </div>
                    </section>
                    <section className="hidden sticky top-[5.75rem] h-[88.75vh] lg:inline-flex lg:min-w-[600px]">
                        <Map searchResults={searchResults} data={data}/>
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
    const keysEnvVar = process.env['CREDS']
    const keys = JSON.parse(keysEnvVar)
    const client = auth.fromJSON(keys)
    client.scopes = ['https://www.googleapis.com/auth/spreadsheets']
    let baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values`

    let dataUrl = `${baseUrl}/listings!A1:AE3819`
    const response = await client.request({url: dataUrl})
    response.data.values.shift();
    let responseData = response.data.values
    responseData = responseData.slice(0, 10)
    let data = responseData.map(item => {
        return {
          id: item[0],
          name: item[1],
          price: item[2],
          image: item[3],
          latitude: item[4],
          longitude: item[5],
          room_type: item[6],
          space: item[7],
          description: item[8],
          neighborhood_overview: item[9],
          notes: item[10],
          transit: item[11],
          host_name: item[12],
          host_about: item[13],
          host_picture: item[14],
          street: item[15],
          neighborhood: item[16],
          city: item[17],
          state: item[18],
          zipcode: item[19],
          country: item[20],
          property_type: item[21],
          accommodates: item[22],
          bathrooms: item[23],
          bedrooms: item[24],
          beds: item[25],
          amenities: item[26],
          weekly_price: item[27],
          monthly_price: item[28],
          number_of_reviews: item[29],
          cancellation_policy: item[30],
        }
      })

    // demo
    //TODO: will update my own data later on
    const searchResults = await fetch('https://links.papareact.com/isz')
    .then(response => response.json())

    return{
        props:{
            searchResults,
            data
        }
    }
}
