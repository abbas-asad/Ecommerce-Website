import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'
import { categorySchema } from './category'
import { orderSchema } from './order'
import { cartschema } from './cart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, orderSchema, cartschema],
}
