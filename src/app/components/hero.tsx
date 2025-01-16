import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="pb-20 lg:py-0  bg-[#FBEBB5]">
            <div className="container mx-auto px-medium lg:px-large">
                <div className="flex flex-col-reverse lg:flex-row ">


                    {/* Content Section */}
                    <div className="lg:w-1/2 flex justify-center items-center text-center lg:items-start flex-col  lg:text-left">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                            Rocket single seater
                        </h2>
                        <span className="text-lg font-medium text-gray-500  mb-6">
                            Experience comfort and style with our Rocket Single Seater. Perfect for any living room.
                        </span>

                        {/* <button className="px-11 py-3 mt-3  border w-fit border-black hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors">
                                  Shop Now
                             </button> */}
                        {/* <button className="px-6 py-2 w-fit  bg-[#f4f4f4] text-black text-sm rounded-full shadow-md hover:shadow-xl transition-all">
                            Shop Now
                        </button> */}
                        <Link className="py-2 border-b border-black transition-colors" href="/">
                            Shop Now
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <Image
                            src="/herosecsofa.png"
                            alt="Asgaard sofa"
                            width={600}
                            height={400}
                            className=" w-full h-auto"
                        />
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Hero
