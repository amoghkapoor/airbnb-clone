

const Footer = () => {
    return (
        <footer className=" bg-gray-100 text-gray-600">
            <div className=" border-b grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 ">
                <div className="space-y-4 text-xs text-gray-800">
                    <h5 className="font-bold">ABOUT</h5>
                    <p className=" cursor-pointer hover:underline hover:text-gray-500">How Airbnb works</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Newsroom</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Investors</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Airbnb Plus</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Airbnb Luxe</p>
                </div>
                
                <div className="space-y-4 text-xs text-gray-800">
                    <h5 className="font-bold">COMMUNITY</h5>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Accessibility</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Not a real site</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">A clone</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Made by</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Amogh Kapoor</p>
                </div>
                
                <div className="space-y-4 text-xs text-gray-800">
                    <h5 className="font-bold">HOST</h5>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Host your home</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Host an online experience</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Resource Center</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Responsible Hosting</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Host an experience</p>
                </div>
                
                <div className="space-y-4 text-xs text-gray-800">
                    <h5 className="font-bold">SUPPORT</h5>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Help Centre</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Trust & Safety</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Cancellation options</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Our Covid-19 Response</p>
                    <p className="cursor-pointer hover:underline hover:text-gray-500">Neighborhood Support</p>
                </div>
            </div>
            <div className="px-20 py-5">
                &copy; Amogh
            </div>
        </footer>
    )
}

export default Footer
