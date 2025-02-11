import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// This is an async server component (Next.js 13+)
export default async function CategorySection() {
  // The GROQ query now aliases slug.current as slug (a string)
  const query = `
    *[_type == "category"]{
      title,
      "slug": slug.current,
    }
  `;
  const categories: any[] = await client.fetch(query);

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-center text-gray-600 mb-12">Find what you are looking for</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-lg"
            >
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src={"/blog3.avif"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  {/* Optionally, you can add item count or other details here */}
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
            <Link href="/shop">View All Items</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
