// export const productsSchema = {
//     name: 'product',
//     title: 'Products',
//     type: 'document',
//     fields: [
//         {
//             name: 'title',
//             title: 'Title',
//             type: 'string',
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'slug',
//             title: 'Slug',
//             type: 'slug',
//             options: {
//                 source: 'title',
//                 maxLength: 96
//             },
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'description',
//             title: 'Description',
//             type: 'text',
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'category',
//             title: 'Category',
//             type: 'reference',
//             to: [{ type: 'category' }],
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'price',
//             title: 'Price',
//             type: 'number',
//             validation: Rule => Rule.required().min(0)
//         },
//         {
//             name: 'discountPercentage',
//             title: 'Discount Percentage',
//             type: 'number'
//         },
//         {
//             name: 'rating',
//             title: 'Rating',
//             type: 'number',
//             validation: Rule => Rule.required().min(0)
//         },
//         {
//             name: 'stock',
//             title: 'Stock',
//             type: 'number',
//             validation: Rule => Rule.required().min(0)
//         },
//         {
//             name: 'tags',
//             title: 'Tags',
//             type: 'array',
//             of: [{ type: 'string' }],
//             options: {
//                 list: [
//                     { title: "furniture", value: "furniture" },
//                     {
//                         title: "Follow products and discounts on Instagram",
//                         value: "instagram",
//                     },
//                     { title: "featured", value: "featured" },
//                 ],
//             },
//         },
//         {
//             name: 'brand',
//             title: 'Brand',
//             type: 'string',
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'sku',
//             title: 'SKU',
//             type: 'string',
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'weight',
//             title: 'Weight',
//             type: 'number'
//         },
//         {
//             name: 'dimensions',
//             title: 'Dimensions',
//             type: 'object',
//             fields: [
//                 {
//                     name: 'width',
//                     title: 'Width',
//                     type: 'number'
//                 },
//                 {
//                     name: 'height',
//                     title: 'Height',
//                     type: 'number'
//                 },
//                 {
//                     name: 'depth',
//                     title: 'Depth',
//                     type: 'number'
//                 }
//             ]
//         },
//         {
//             name: 'warrantyInformation',
//             title: 'Warranty Information',
//             type: 'text'
//         },
//         {
//             name: 'shippingInformation',
//             title: 'Shipping Information',
//             type: 'text'
//         },
//         {
//             name: 'availabilityStatus',
//             title: 'Availability Status',
//             type: 'string',
//             validation: Rule => Rule.required()
//         },
//         {
//             name: 'reviews',
//             title: 'Reviews',
//             type: 'array',
//             of: [
//                 {
//                     type: 'object',
//                     fields: [
//                         {
//                             name: 'rating',
//                             title: 'Rating',
//                             type: 'number',
//                             validation: Rule => Rule.required().min(0).max(5)
//                         },
//                         {
//                             name: 'comment',
//                             title: 'Comment',
//                             type: 'text',
//                             validation: Rule => Rule.required()
//                         },
//                         {
//                             name: 'date',
//                             title: 'Date',
//                             type: 'datetime',
//                             validation: Rule => Rule.required()
//                         },
//                         {
//                             name: 'reviewerName',
//                             title: 'Reviewer Name',
//                             type: 'string',
//                             validation: Rule => Rule.required()
//                         },
//                         {
//                             name: 'reviewerEmail',
//                             title: 'Reviewer Email',
//                             type: 'string',
//                             validation: Rule => Rule.required().email()
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             name: 'returnPolicy',
//             title: 'Return Policy',
//             type: 'text'
//         },
//         {
//             name: 'minimumOrderQuantity',
//             title: 'Minimum Order Quantity',
//             type: 'number'
//         },
//         {
//             name: 'meta',
//             title: 'Meta Information',
//             type: 'object',
//             fields: [
//                 {
//                     name: 'createdAt',
//                     title: 'Created At',
//                     type: 'datetime'
//                 },
//                 {
//                     name: 'updatedAt',
//                     title: 'Updated At',
//                     type: 'datetime'
//                 },
//                 {
//                     name: 'barcode',
//                     title: 'Barcode',
//                     type: 'string'
//                 },
//                 {
//                     name: 'qrCode',
//                     title: 'QR Code',
//                     type: 'string'
//                 }
//             ]
//         },
//         {
//             name: 'images',
//             title: 'Images',
//             type: 'array',
//             of: [
//                 {
//                     type: 'image',
//                     options: {
//                         hotspot: true
//                     }
//                 }
//             ]
//         },
//         {
//             name: 'thumbnail',
//             title: 'Thumbnail',
//             type: 'image',
//             options: {
//                 hotspot: true
//             },
//             validation: Rule => Rule.required()
//         }
//     ]
// }
