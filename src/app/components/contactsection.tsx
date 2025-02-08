"use client"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(50, { message: "Name must be at most 50 characters" }),

    email: z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email address (e.g., name@example.com)" }),

    subject: z
        .string()
        .trim()
        .max(100, { message: "Subject must be at most 100 characters" })
        .optional(),

    message: z
        .string()
        .trim()
        .min(10, { message: "Message must be at least 10 characters" })
        .max(500, { message: "Message must be at most 500 characters" }),
})

type ContactFormValues = z.infer<typeof contactSchema>

const formFields = [
    { id: 'name', label: 'Your name', type: 'text', placeholder: 'John Doe', required: true },
    { id: 'email', label: 'Email address', type: 'email', placeholder: 'john@example.com', required: true },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Optional subject', required: false },
    { id: 'message', label: 'Message', type: 'textarea', placeholder: "Your message here...", required: true },
]

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)
        try {
            await client.create({
                _type: 'contact',
                ...data,
                submittedAt: new Date().toISOString()
            })
            toast.success('Message sent successfully!')
            reset()
        } catch (error) {
            console.error('Submission error:', error)
            toast.error('There was an error sending your message. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-medium lg:px-large py-16">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-[1.8rem] font-bold mb-4">Get In Touch With Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    For More Information About Our Product & Services. Please Feel Free To Drop Us
                    An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <MapPin className="w-10 h-10 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Address</h3>
                            <p className="text-gray-600">
                                236 5th SE Avenue, New<br />
                                York NY10000, United States
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Phone className="w-10 h-10 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Phone</h3>
                            <p className="text-gray-600">
                                Mobile: +(84) 546-6789<br />
                                Hotline: +(84) 456-6789
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Clock className="w-10 h-10 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Working Time</h3>
                            <p className="text-gray-600">
                                Monday-Friday: 9:00 - 22:00<br />
                                Saturday-Sunday: 9:00 - 21:00
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {formFields.map((field) => (
                            <div key={field.id}>
                                <label className="block text-sm font-medium mb-2" htmlFor={field.id}>
                                    {field.label}
                                    {/* {field.required && <span className="text-red-500">*</span>} */}
                                </label>
                                {field.type === 'textarea' ? (
                                    <div>
                                        <Textarea
                                            id={field.id}
                                            {...register(field.id as keyof ContactFormValues)}
                                            placeholder={field.placeholder}
                                            className="w-full min-h-[150px]"
                                        />
                                        {errors[field.id as keyof ContactFormValues] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors[field.id as keyof ContactFormValues]?.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <Input
                                            id={field.id}
                                            type={field.type}
                                            {...register(field.id as keyof ContactFormValues)}
                                            placeholder={field.placeholder}
                                            className="w-full"
                                        />
                                        {errors[field.id as keyof ContactFormValues] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors[field.id as keyof ContactFormValues]?.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
