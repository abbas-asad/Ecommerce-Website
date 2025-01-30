export const orderSchema=  {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'orderId',
        title: 'Order ID',
        type: 'string'
      },
      {
        name: 'userId',
        title: 'User ID',
        type: 'string'
      },
      {
        name: 'customer',
        title: 'Customer',
        type: 'object',
        fields: [
          { name: 'firstName', type: 'string' },
          { name: 'lastName', type: 'string' },
          { name: 'phone', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'city', type: 'string' }
        ]
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'product',
                title: 'Product',
                type: 'reference',
                to: [{ type: 'product' }]
              },
              { name: 'quantity', type: 'number' },
              { name: 'price', type: 'number' },
              { name: 'size', type: 'string' },
              { name: 'color', type: 'string' }
            ]
          }
        ]
      },
      {
        name: 'paymentMethod',
        title: 'Payment Method',
        type: 'string'
      },
      {
        name: 'totals',
        title: 'Totals',
        type: 'object',
        fields: [
          { name: 'subtotal', type: 'number' },
          { name: 'tax', type: 'number' },
          { name: 'total', type: 'number' }
        ]
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
        }
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime'
      }
    ]
  }