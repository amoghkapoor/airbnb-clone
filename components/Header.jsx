import {useState, useEffect} from "react"
import Image from "next/image"
import {
    SearchIcon,
    UsersIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon
} from "@heroicons/react/solid"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";

const Header = ({placeholder, style}) => {
    const [searchInput, setSearchInput] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const router = useRouter()
    const [scroll, setScroll] = useState(false)

    const selectionRange = {
        startDate,
        endDate,
        key: "selection"
    }
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    const resetInput = () => {
        setSearchInput("")
    }
    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuests
            }
        })
    }
    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }

    useEffect(() => {
        document.onload = handleScroll();
        window.addEventListener('scroll', handleScroll);
  
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <>
        {style ? 
        <header className={` ${scroll ? `bg-white shadow-md` : `bg-transparent`} fixed w-full top-0 z-50 grid grid-cols-3 p-5 md:px-10 transition ease-in duration-200`}>

            {/* left */}
            <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/2560px-Airbnb_Logo_Bélo.svg.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    alt="Airbnb Logo"
                    aria-label="Airbnb Logo"
                />
            </div>

            {/* middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
                type="text" 
                placeholder={placeholder || `Start your search`}
                name="search-bar" 
                className={`${scroll ? `text-gray-600 placeholder-gray-400` : `text-white placeholder-white`} flex-grow pl-5 bg-transparent outline-none text-sm  `}/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* right */}
            <div className={`${scroll ? `text-gray-500` : `text-white`} flex space-x-4 items-center justify-end `}>
                <p className="hidden md:inline cursor-pointer ">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer " />

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full ">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div> 
           
            {searchInput && 
            <div className="flex bg-white p-10 pb-5 flex-col col-span-3 mt-5 rounded-2xl mx-auto">
                <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4">
                    <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                    <UsersIcon className="h-5"/>
                    <input min={1} value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} type="number" className="w-12 pl-2 text-lg outline-none text-red-400"/>
                </div>
                <div className="flex items-center ">
                    <button onClick={resetInput} className=" px-2 py-4 flex-grow text-gray-500 hover:text-white hover:bg-gray-500 rounded-2xl transition duration-400 ease-in">Cancel</button>
                    <button onClick={search} className="flex-grow px-2 py-4 text-red-400 hover:text-white hover:bg-red-400 transition rounded-2xl duration-400 ease-in">Search</button>
                </div>
            </div> }
        </header>
         : <header className={` bg-white shadow-md sticky w-full top-0 z-50 grid grid-cols-3 p-5 md:px-10 transition ease-in duration-200`}>

         {/* left */}
         <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
             <Image
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/2560px-Airbnb_Logo_Bélo.svg.png"
                 layout="fill"
                 objectFit="contain"
                 objectPosition="left"
                 alt="Airbnb Logo"
                 aria-label="Airbnb Logo"
             />
         </div>

         {/* middle */}
         <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
             <input 
             value={searchInput} 
             onChange={(e) => setSearchInput(e.target.value)} 
             type="text" 
             placeholder={placeholder || `Start your search`}
             name="search-bar" 
             className={`text-gray-600 placeholder-gray-400 flex-grow pl-5 bg-transparent outline-none text-sm  `}/>
             <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
         </div>

         {/* right */}
         <div className={`text-gray-500 flex space-x-4 items-center justify-end `}>
             <p className="hidden md:inline cursor-pointer ">Become a host</p>
             <GlobeAltIcon className="h-6 cursor-pointer " />

             <div className="flex items-center space-x-2 border-2 p-2 rounded-full ">
                 <MenuIcon className="h-6" />
                 <UserCircleIcon className="h-6" />
             </div>
         </div> 
        
         {searchInput && 
         <div className="flex bg-white p-10 pb-5 flex-col col-span-3 mt-5 rounded-2xl mx-auto">
             <DateRangePicker
             ranges={[selectionRange]}
             minDate={new Date()}
             rangeColors={["#FD5B61"]}
             onChange={handleSelect}
             />
             <div className="flex items-center border-b mb-4">
                 <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                 <UsersIcon className="h-5"/>
                 <input min={1} value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} type="number" className="w-12 pl-2 text-lg outline-none text-red-400"/>
             </div>
             <div className="flex items-center ">
                 <button onClick={resetInput} className=" px-2 py-4 flex-grow text-gray-500 hover:text-white hover:bg-gray-500 rounded-2xl transition duration-400 ease-in">Cancel</button>
                 <button onClick={search} className="flex-grow px-2 py-4 text-red-400 hover:text-white hover:bg-red-400 transition rounded-2xl duration-400 ease-in">Search</button>
             </div>
         </div> }
     </header> }
        </>
    )
}

export default Header
