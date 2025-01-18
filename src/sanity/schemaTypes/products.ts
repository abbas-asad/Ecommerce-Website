// schemas/product.ts
import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'discountPercentage',
            title: 'Discount Percentage',
            type: 'number'
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: "furniture", value: "furniture" },
                    // {
                    //   title: "Follow products and discounts on Instagram",
                    //   value: "instagram",
                    // },
                    // { title: "Gallery", value: "gallery" },
                ],
            },
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'string',
            // validation: Rule => Rule.required()
        }),
        defineField({
            name: 'sku',
            title: 'SKU',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'weight',
            title: 'Weight',
            type: 'number'
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
                {
                    name: 'width',
                    title: 'Width',
                    type: 'number'
                },
                {
                    name: 'height',
                    title: 'Height',
                    type: 'number'
                },
                {
                    name: 'depth',
                    title: 'Depth',
                    type: 'number'
                }
            ]
        }),
        defineField({
            name: 'warrantyInformation',
            title: 'Warranty Information',
            type: 'text'
        }),
        defineField({
            name: 'shippingInformation',
            title: 'Shipping Information',
            type: 'text'
        }),
        defineField({
            name: 'availabilityStatus',
            title: 'Availability Status',
            type: 'string',
            // validation: Rule => Rule.required()
        }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'rating',
                            title: 'Rating',
                            type: 'number',
                            validation: Rule => Rule.required().min(0).max(5)
                        },
                        {
                            name: 'comment',
                            title: 'Comment',
                            type: 'text',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'date',
                            title: 'Date',
                            type: 'datetime',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'reviewerName',
                            title: 'Reviewer Name',
                            type: 'string',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'reviewerEmail',
                            title: 'Reviewer Email',
                            type: 'string',
                            validation: Rule => Rule.required().email()
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'returnPolicy',
            title: 'Return Policy',
            type: 'text'
        }),
        defineField({
            name: 'minimumOrderQuantity',
            title: 'Minimum Order Quantity',
            type: 'number'
        }),
        defineField({
            name: 'meta',
            title: 'Meta Information',
            type: 'object',
            fields: [
                {
                    name: 'createdAt',
                    title: 'Created At',
                    type: 'datetime'
                },
                {
                    name: 'updatedAt',
                    title: 'Updated At',
                    type: 'datetime'
                },
                {
                    name: 'barcode',
                    title: 'Barcode',
                    type: 'string'
                },
                {
                    name: 'qrCode',
                    title: 'QR Code',
                    type: 'string'
                }
            ]
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ]
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        })
    ]
})
