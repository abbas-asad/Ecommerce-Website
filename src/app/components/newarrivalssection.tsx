import Image from "next/image"
import Link from "next/link"

const NewArrivalsSection = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#FFF9E5]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
                    {/* Image Section */}
                    <div className="lg:w-1/2 w-full relative group overflow-hidden  duration-300">
                        <Link href="#" aria-label="View Asgaard Sofa">
                            <Image
                                src="/asgsofa.png"
                                alt="Asgaard sofa"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 flex items-center flex-col text-center space-y-4 lg:space-y-6 px-4 sm:px-0">
                        <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-widest mb-2">
                            New Arrivals
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Asgaard Sofa
                        </h2>

                        <div className="mt-4 lg:mt-6">
                            <Link
                                href="#"
                                className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-medium border border-gray-900 rounded-full
                                           bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white 
                                           transition-all duration-300 transform"
                                role="button"
                                aria-label="Order Asgaard Sofa"
                            >
                                Order Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewArrivalsSection