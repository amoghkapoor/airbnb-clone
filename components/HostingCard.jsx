import Image from "next/image"

const HostingCard = () => {
    return (
        <div className="relative py-16 cursor-pointer">
            <div className="relative h-96 min-w-[300px]">
            <Image
            src="https://a0.muscache.com/im/pictures/5b4dc94a-0b4c-4c27-b50f-9c5a5b93c775.jpg?im_w=1440"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            />
            </div>

            <div className="absolute top-32 left-12">
            <h3 className="text-6xl mb-3 w-96 text-white">Try Hosting</h3>
            <p className="text-white text-lg w-80 mb-14">Earn extra income and unlock new opportunities by sharing your space</p>
            <button className="bg-white px-7 py-3 text-lg rounded-lg">Learn more</button>
            </div>
        </div>
    )
}

export default HostingCard
