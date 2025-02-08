export const categoriesSchema = {
    name: 'category',
    title: 'Categories',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
        },
    ]
}
