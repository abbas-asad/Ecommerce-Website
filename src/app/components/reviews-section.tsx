"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { client } from "@/sanity/lib/client"
import { getOrCreateUserId } from "@/lib/user"

interface Review {
  _id: string
  rating: number
  comment: string
  user: {
    name: string
    email: string
  }
  createdAt: string
}

interface ReviewSectionProps {
  productId: string
  initialReviews: Review[]
}

export default function ReviewSection({ productId, initialReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // Fetch reviews from Sanity on mount and when productId changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `
          *[_type == "review" && product._ref == $productId] | order(createdAt desc) {
            _id,
            rating,
            comment,
            user,
            createdAt
          }
        `
        const fetchedReviews = await client.fetch(query, { productId }, { useCdn: false })
        console.log("Fetched reviews:", fetchedReviews)
        setReviews(fetchedReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReviews()
  }, [productId])

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  // Reset form fields and hide form
  const resetForm = () => {
    setComment("")
    setRating(5)
    setName("")
    setEmail("")
    setShowForm(false)
  }

  // Handle review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const userId = getOrCreateUserId()
      const review = {
        _type: "review",
        rating,
        comment,
        product: {
          _type: "reference",
          _ref: productId,
        },
        user: {
          name,
          email,
        },
        createdAt: new Date().toISOString(),
      }

      const result = await client.create(review)
      // Prepend the new review so that the latest review is on top
      setReviews([{ ...review, _id: result._id } as Review, ...reviews])
      toast.success("Review submitted successfully!")
      resetForm()
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Customer Reviews</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center">
              <span className="text-lg font-medium mr-2">{averageRating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"} fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white w-full sm:w-auto"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-4 sm:p-6 border rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-6 h-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium">
                Review
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                className="bg-white hover:bg-[#F9F1E7] text-[#B88E2F] border border-[#B88E2F] w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Loading indicator */}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex mt-2 sm:mt-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
