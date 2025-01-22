import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="/heroimg.avif"
        alt="Luxurious living room"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Elevate Your Living Space
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8">
            Discover exquisite furniture that transforms your home into a sanctuary of style and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-3">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black text-lg px-8 py-3"
            >
              <Link href="/collections">View Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

