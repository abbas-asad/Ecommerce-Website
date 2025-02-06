export const cartsSchema = {
    name: 'cart',
    title: 'Cart',
    type: 'document',
    fields: [
        {
            name: 'userID',
            title: 'User ID',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Product',
            type: 'reference',
            to: [{ type: 'product' }],
        },
        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
        },
        {
            name: 'size',
            title: 'Size',
            type: 'string'
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string'
        }
        // Add size/color fields if needed
    ],
};