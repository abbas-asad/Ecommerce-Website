import Product from '@/app/components/product';
import Productcards from '@/app/components/productcards';
import React from 'react'

const Productdetails = async ({ params }: { params: { id: string } }) => {
    const productElement = await Product({ params });
    return (
        <main>
            {productElement}
            <Productcards headingName="Related Products" limit={4} />
        </main>
    )
}

export default Productdetails


