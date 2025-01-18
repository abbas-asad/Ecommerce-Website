// schemas/category.ts
import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        },)
    ]
})
