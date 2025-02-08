export const ordersSchema = {
    name: 'order',
    title: 'Orders',
    type: 'document',
    fields: [
        {
            name: 'orderId',
            title: 'Order ID',
            type: 'string',
            readOnly: true
        },
        {
            name: 'userId',
            title: 'Customer ID',
            type: 'string',
            readOnly: true
        },
        {
            name: 'customer',
            title: 'Customer Details',
            type: 'object',
            readOnly: true,
            fields: [
                { name: 'firstName', type: 'string', readOnly: true },
                { name: 'lastName', type: 'string', readOnly: true },
                { name: 'phone', title: 'Phone number', type: 'string', readOnly: true },
                { name: 'address', type: 'string', readOnly: true },
                { name: 'city', type: 'string', readOnly: true }
            ]
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            readOnly: true,
            of: [
                {
                    type: 'object',
                    readOnly: true,
                    preview: {
                        select: {
                            title: 'product.title',
                            media: 'product.thumbnail',
                            quantity: 'quantity'
                        },
                        prepare(selection) {
                            const { title, media, quantity } = selection
                            return {
                                title: title || 'Untitled',
                                subtitle: `Quantity: ${quantity ?? 'Not specified'}`,
                                media: media
                            }
                        }
                    },
                    fields: [
                        {
                            name: 'product',
                            title: 'Product',
                            type: 'reference',
                            to: [{ type: 'product' }],
                            readOnly: true
                        },
                        {
                            name: 'quantity',
                            title: 'Quantity',
                            type: 'number',
                            readOnly: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            readOnly: true
        },
        {
            name: 'additionalInfo',
            title: 'Additional Information',
            type: 'text',
            rows: 4,
            readOnly: true
        },
        {
            name: 'totals',
            title: 'Totals',
            type: 'object',
            readOnly: true,
            fields: [
                { name: 'subtotal', type: 'number', readOnly: true },
                { name: 'tax', type: 'number', readOnly: true },
                { name: 'total', type: 'number', readOnly: true }
            ]
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            readOnly: true,
            options: {
                list: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
            }
        },
        {
            name: 'createdAt',
            title: 'Order Time',
            type: 'datetime',
            readOnly: true
        }
    ]
}