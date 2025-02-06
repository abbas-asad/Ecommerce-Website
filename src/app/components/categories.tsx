import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CategorySection() {
    const categories = [
        {
            name: "Living Room",
            image: "/blog1.avif",
            slug: "living-room",
            itemCount: 120,
        },
        {
            name: "Bedroom",
            image: "/blog2.avif",
            slug: "bedroom",
            itemCount: 90,
        },
        {
            name: "Dining",
            image: "/blog3.avif",
            slug: "dining",
            itemCount: 70,
        },
        {
            name: "Office",
            image: "/instabg.avif",
            slug: "office",
            itemCount: 50,
        },
    ]

    return (
        <section className="py-16  px-medium lg:px-large">
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold mb-2">Shop by Category</h2>
                <p className="text-center text-gray-600 mb-12">Find what you are looking for</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/shop/${category.slug}`}
                            className="group relative block overflow-hidden rounded-lg"
                        >
                            <div className="relative h-[400px] w-full overflow-hidden">
                                <Image
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                    <p className="mt-1 text-sm opacity-90">{category.itemCount} items</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        asChild
                        variant="outline"
                        className="border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
                    >
                        <Link href="/shop">View All Categories</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}