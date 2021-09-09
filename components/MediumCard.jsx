import Image from "next/image"

const MediumCard = ({category, image}) => {
    return (
        <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
            <div className="relative h-80 w-80">
                <Image
                layout="fill"
                src={image}
                className="rounded-xl"
                />
            </div>
            <h3 className="text-2xl mt-3">{category}</h3>
        </div>
    )
}

export default MediumCard
