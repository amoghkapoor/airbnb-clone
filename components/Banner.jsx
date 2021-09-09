import Image from "next/image"

const Banner = () => {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px]">
            <Image
                src="https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute top-1/2 w-full text-center">
                <p className="text-sm sm:text-lg">
                    Not sure where to go? Perfect.
                </p>
                <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl transition duration-150">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
