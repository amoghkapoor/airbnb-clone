import Image from "next/image"
import * as OutlineIcon from "@heroicons/react/outline"
import { StarIcon, HeartIcon } from "@heroicons/react/solid"

const InfoCard = ({image, room_type, price, title, days, accommodates, bedrooms, beds, bathrooms, amenities}) => {
    let index = price.indexOf(".")
    let total = (parseInt(price.slice(1, index)) * days).toString()
    total = "Total: $"+total 

    let accommodatesInfo = `${accommodates} ${accommodates === "1" ? `guest` : `guests`}`
    let bedroomsInfo = `${bedrooms} ${bedrooms === "1" ? `bedroom` : `bedrooms`}`
    let bedsInfo = `${beds} ${beds === "1" ? `bed` : `beds`}`
    let bathroomsInfo = `${bathrooms} ${bathrooms === "1" ? `bathroom` : `bathrooms`}`
    let description = `${accommodatesInfo} \u{2022} ${bedroomsInfo} \u{2022} ${bedsInfo} \u{2022} ${bathroomsInfo}`
    
    return (
        <div className="flex py-7 px-8 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition ease-out duration-200 first:border-t mb-3">
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image src={image} objectFit="cover" layout="fill" className="rounded-2xl"/>
            </div>

            <div className="flex flex-col pl-5 flex-grow">
                <div className="flex justify-between">
                    <p>{room_type}</p>
                    <OutlineIcon.HeartIcon className="h-7 cursor-pointer"/>
                </div>
                <h4 className="text-xl ">{title}</h4>
                <div className="border-b w-10 pt-2"/>
                <p className="text-sm pt-2 text-gray-500 flex-grow">{description}</p>
                <div className="flex justify-between item-end pt-5">
                    <p className="flex items-center"><StarIcon className="h-5 text-yellow-500"/>{((Math.random() * 1.5) + 3.5).toFixed(2)}</p>
                    <div>
                        <p className="text-lg font-semibold pb-2 lg:text-2xl">{price} / night</p>
                        <p className="text-right font-extralight">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
