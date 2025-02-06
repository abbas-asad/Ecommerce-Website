import { type SchemaTypeDefinition } from 'sanity'
import { productsSchema } from './products'
import { categoriesSchema } from './categories'
import { ordersSchema } from './orders'
import { cartsSchema } from './carts'
import { reviewsSchema } from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productsSchema, categoriesSchema, cartsSchema, ordersSchema, reviewsSchema],
}
