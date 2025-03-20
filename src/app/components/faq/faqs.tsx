"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer support team for assistance.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        question: "What are your shipping rates?",
        answer:
          "Shipping rates vary depending on your location and the size of your order. You can view the exact shipping cost at checkout before completing your purchase.",
      },
      {
        question: "How long will it take to receive my order?",
        answer:
          "Domestic orders typically arrive within 3-5 business days. International orders may take 7-14 business days, depending on the destination and customs processing.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for all unused items in their original packaging. Please refer to our Returns page for more detailed information.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "To initiate a return, log into your account, go to your order history, and select the 'Return Item' option next to the relevant product. Follow the prompts to complete the return process.",
      },
    ],
  },
  {
    category: "Product Information",
    questions: [
      {
        question: "Are your products eco-friendly?",
        answer:
          "Many of our products are eco-friendly. Look for the 'Eco-Friendly' badge on product pages to identify these items.",
      },
      {
        question: "Do you offer product warranties?",
        answer:
          "Yes, many of our products come with manufacturer warranties. The warranty information is listed on each product's page under the 'Warranty' section.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your details and follow the prompts to complete the registration process.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.",
      },
    ],
  },
]

interface FAQProps {
  searchTerm: string
}

export function FAQ({ searchTerm }: FAQProps) {
  const [filteredFAQ, setFilteredFAQ] = useState(faqData)

  useEffect(() => {
    const filtered = faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredFAQ(filtered)
  }, [searchTerm])

  return (
    <div className="w-full  mx-auto py-12 px-2">
      {filteredFAQ.length === 0 ? (
        <p className="text-center text-gray-600">No results found. Please try a different search term.</p>
      ) : (
        filteredFAQ.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{category.category}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item, index) => (
                <AccordionItem key={index} value={`${category.category}-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      )}
    </div>
  )
}

