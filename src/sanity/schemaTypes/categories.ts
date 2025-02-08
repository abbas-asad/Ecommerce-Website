import { Tags } from 'lucide-react';
import { defineType, defineField } from 'sanity';

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'image',
    //   title: 'Image',
    //   type: 'image',
    //   options: { hotspot: true },
    // }),
    // (Optional) You could store additional fields such as URL if needed.
  ],
});
