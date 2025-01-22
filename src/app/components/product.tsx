import { client } from '@/sanity/lib/client'
import ProductClient from './productclient'
import { Product as IProduct } from "../studio/sanity.types"

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params

    const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        price,
        "thumbnail": thumbnail.asset->url,
        rating,
        slug,
        stock,
        sku,
        "category": category->title,
        tags,
        "images": images[].asset->url,
        description
    }`

    const product: IProduct = await client.fetch(query, { slug })

    if (!product) {
        return <div>Product not found</div>
    }

    return <ProductClient product={product} />
}