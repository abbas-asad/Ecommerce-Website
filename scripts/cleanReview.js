import { createClient } from '@sanity/client'

const client = createClient({
  projectId: "xf9cp9n9",
  dataset: "production",
  token: "sklpHWRCEAK8yL8JXnA38nlSeKAaBv06WmhALUscYWRzeb5Sc7OR0d9WKx24OX3EGrdNWz91gsYKLYRSvEhiuTxRhm6zG9fwMLowZrlZKXayrZOHQK5PYKG2o5FXVvNMVATxx91AW32jnAOuxyrRjDJk5OPEmXRHqT9LEzfipHEx2YFWOn4W",
  apiVersion: "v2025-01-16"
})


const deleteReviews = async () => {  
  try {
    const query = '*[_type == "cart"]'
    const documents = await client.fetch(query)
    
    console.log(`Found ${documents.length} reviews to delete`)
    
    const transaction = client.transaction()
    for (const doc of documents) {
      transaction.delete(doc._id)
    }
    
    await transaction.commit()
    console.log('All reviews deleted successfully')
    
  } catch (error) {
    console.error('Error deleting reviews:', error)
  }
}

deleteReviews()