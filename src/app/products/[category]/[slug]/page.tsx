import { notFound } from "next/navigation"
import { client } from '@/sanity/lib/client'
import ProductClientPage from "@/app/components/singal-product-client"
import ProductCards from "@/app/components/related-products"

// Fetch product data from Sanity
async function getProduct(category: string, slug: string) {
    try {
        // GROQ query to fetch product by category and slug
        const query = `*[_type == "product" && category->slug.current == $category && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  "category": category->title,
  "categorySlug": category->slug.current,
  tags,
  brand,
  sku,
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  availabilityStatus,
  returnPolicy,
  minimumOrderQuantity,
  "images": images[].asset->url,
  "thumbnail": thumbnail.asset->url,
//   specifications[] {
//     name,
//     value
//   },
  "reviews": reviews[]{
    rating,
    comment,
    date,
    reviewerName,
    reviewerEmail
  }
}`

        const product = await client.fetch(query, { category, slug })

        if (!product) {
            console.log(`Product not found with category: ${category} and slug: ${slug}`)
            return null
        }

        return product
    } catch (error) {
        console.error("Error fetching product:", error)
        return null
    }
}

export default async function ProductPage({ params }: { params: { category: string; slug: string } }) {
    console.log(`Requested product with category: ${params.category}, slug: ${params.slug}`)
    const product = await getProduct(params.category, params.slug)
    if (!product) {
        console.log("Product not found, returning 404")
        notFound()
    }
    // Delegate rendering to the client-side component
    return (
        <>
            <ProductClientPage product={product} />
            {/* <ProductCards title="New Arrivals" queryCondition="isNewArrival == true" subtitle="Check out our latest products"  /> */}
        </>
    )
}

