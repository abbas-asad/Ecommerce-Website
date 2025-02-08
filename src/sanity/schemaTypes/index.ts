import { type SchemaTypeDefinition } from 'sanity'

import { productsSchema } from './products'
import { categoriesSchema } from './categories'
import { cartsSchema } from './carts'
import { ordersSchema } from './orders'
import { reviewsSchema } from './reviews'
import { contactsSchema } from './contacts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productsSchema, categoriesSchema, cartsSchema, ordersSchema, reviewsSchema, contactsSchema],
}
