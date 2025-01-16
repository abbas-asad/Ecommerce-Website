import Image from "next/image"

const Newarrivalssection = () => {
    return (
        <section className="py-16 bg-[#FFF9E5]">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Image Section */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <Image
                            src="/asgsofa.png"
                            alt="Asgaard sofa"
                            width={600}
                            height={400}
                            className=" w-full h-auto"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 flex items-center flex-col text-center">
                        <span className="text-sm font-medium text-gray-500 uppercase mb-2">
                            New Arrivals
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
                            Asgaard Sofa
                        </h2>
                        {/* <p className="text-gray-600 mb-6">
                            Experience luxury and comfort with the Asgaard Sofa, designed to
                            enhance your living space. Perfect for modern homes!
                        </p> */}
                        <button className="px-11 py-3  border border-black hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newarrivalssection
