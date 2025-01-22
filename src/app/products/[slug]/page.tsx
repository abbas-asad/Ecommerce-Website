import Product from '@/app/components/product';
import Productcards from '@/app/components/productcards';
import React from 'react';

const Productdetails = ({ params }: { params: { slug: string } }) => {
    return (
        <main>
            {/* Pass the params as props to the Product component */}
            <Product params={params} />
            <Productcards headingName="Related Products" limit={4} />
        </main>
    );
};

export default Productdetails;
