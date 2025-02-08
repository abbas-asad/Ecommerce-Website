import Product from "@/app/components/product"
import Productcards from "@/app/components/productcards"
import ReviewSection from "@/app/components/review-section"
import { client } from "@/sanity/lib/client"

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    price,
    description,
    "thumbnail": images[0].asset->url,
    "images": images[].asset->url,
    stock,
    sku,
    category,
    tags
  }`

  return client.fetch(query, { slug })
}

async function getProductReviews(productId: string) {
  const reviews = await client.fetch(
    `
    *[_type == "review" && product._ref == $productId] | order(createdAt desc) {
      _id,
      rating,
      comment,
      user,
      createdAt
    }
  `,
    { productId },
  )

  return reviews
}

export default async function Productdetails({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  const reviews = await getProductReviews(product._id)

  return (
    <main>
      {/* Removed reviews prop from Product to match its props interface */}
      <Product params={params} />
      <ReviewSection productId={product._id} initialReviews={reviews} />
      <Productcards headingName="Related Products" limit={4} />
    </main>
  )
}
