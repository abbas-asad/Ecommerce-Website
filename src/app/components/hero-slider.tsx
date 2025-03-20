"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const HeroSlider = () => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const autoPlayRef = useRef<() => void>(() => { })

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
            title: "Summer Collection 2024",
            description: "Up to 50% off on selected items",
            cta: "Shop Now",
            color: "from-blue-900/70 to-blue-900/30",
        },
        {
           image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
            title: "New Fashion Arrivals",
            description: "The latest styles at unbeatable prices",
            cta: "Explore",
            color: "from-purple-900/70 to-purple-900/30",
        },
        {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
            title: "Home Decor Sale",
            description: "Transform your space with our exclusive collection",
            cta: "Discover More",
            color: "from-green-900/70 to-green-900/30",
        },
    ]

    useEffect(() => {
        autoPlayRef.current = nextSlide
    })

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }

        const interval = setInterval(play, 5000)
        return () => clearInterval(interval)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="flex justify-center w-full">
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden w-full max-w-[1500px]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}></div>
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            layout="fill"
                            objectFit="cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center z-20 px-6 md:px-16 lg:px-24">
                            <AnimatePresence mode="wait">
                                {index === currentSlide && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 max-w-xl leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg">{slide.description}</p>
                                        <div>
                                            <Button size="lg" className="font-medium text-base px-8 py-6 relative overflow-hidden group">
                                                <span className="relative z-10">{slide.cta}</span>
                                                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}

                {/* Navigation arrows */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "bg-white/50 hover:bg-white/80"
                                }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSlider


// "use client"

// import { useState, useEffect, useRef } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { motion, AnimatePresence } from "framer-motion"

// const HeroSlider = () => {

//     const [currentSlide, setCurrentSlide] = useState(0)
//     const autoPlayRef = useRef<() => void>(() => { })

//     const slides = [
//         {
//             image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
//             title: "Summer Collection 2024",
//             description: "Up to 50% off on selected items",
//             cta: "Shop Now",
//             color: "from-blue-900/70 to-blue-900/30",
//         },
//         {
//             image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
//             title: "New Fashion Arrivals",
//             description: "The latest styles at unbeatable prices",
//             cta: "Explore",
//             color: "from-purple-900/70 to-purple-900/30",
//         },
//         {
//             image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
//             title: "Home Decor Sale",
//             description: "Transform your space with our exclusive collection",
//             cta: "Discover More",
//             color: "from-green-900/70 to-green-900/30",
//         },
//     ]

//     useEffect(() => {
//         autoPlayRef.current = nextSlide
//     })

//     useEffect(() => {
//         const play = () => {
//             autoPlayRef.current()
//         }

//         const interval = setInterval(play, 5000)
//         return () => clearInterval(interval)
//     }, [])

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
//     }

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
//     }

//     return (
//         <div className="flex justify-center w-full">
//             <div className="relative h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden w-full max-w-[1500px]">
//                 {slides.map((slide, index) => (
//                     <div
//                         key={index}
//                         className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
//                             }`}
//                     >
//                         <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}></div>
//                         <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
//                         <div className="absolute inset-0 flex flex-col justify-center z-20 px-6 md:px-16 lg:px-24">
//                             <AnimatePresence mode="wait">
//                                 {index === currentSlide && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -20 }}
//                                         transition={{ duration: 0.5 }}
//                                     >
//                                         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 max-w-xl leading-tight">
//                                             {slide.title}
//                                         </h1>
//                                         <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg">{slide.description}</p>
//                                         <div>
//                                             <Button size="lg" className="font-medium text-base px-8 py-6 relative overflow-hidden group">
//                                                 <span className="relative z-10">{slide.cta}</span>
//                                                 <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                                             </Button>
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Navigation arrows */}
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
//                     onClick={prevSlide}
//                 >
//                     <ChevronLeft className="h-6 w-6" />
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
//                     onClick={nextSlide}
//                 >
//                     <ChevronRight className="h-6 w-6" />
//                 </Button>

//                 {/* Indicators */}
//                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
//                     {slides.map((_, index) => (
//                         <button
//                             key={index}
//                             className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "bg-white/50 hover:bg-white/80"
//                                 }`}
//                             onClick={() => setCurrentSlide(index)}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSlider
