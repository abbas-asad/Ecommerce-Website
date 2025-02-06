import { Tags } from 'lucide-react'
import { defineType, defineField } from 'sanity'

export const categoriesSchema = defineType({
    name: 'category',
    title: 'Categories',
    type: 'document',
    icon: Tags,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        },)
    ]
})
