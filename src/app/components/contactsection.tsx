import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock } from 'lucide-react'

const formFields = [
    { id: 'name', label: 'Your name', type: 'text', placeholder: 'Abc' },
    { id: 'email', label: 'Email address', type: 'email', placeholder: 'Abc@def.com' },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'This is an optional' },
    { id: 'message', label: 'Message', type: 'textarea', placeholder: "Hi! I'd like to ask about" },
]

export default function Contactsection() {
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

            {/* Contact Section */}
            <div className="grid md:grid-cols-2 gap-16 ">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Address</h3>
                            <p className="text-gray-600">
                                236 5th SE Avenue, New<br />
                                York NY10000, United<br />
                                States
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <Phone className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Phone</h3>
                            <p className="text-gray-600">
                                Mobile: +(84) 546-6789<br />
                                Hotline: +(84) 456-6789
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <Clock className="w-10 h-10" />
                        </div>
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
                    <form className="space-y-6">
                        {formFields.map((field) => (
                            <div key={field.id}>
                                <label className="block text-sm font-medium mb-2" htmlFor={field.id}>
                                    {field.label}
                                </label>
                                {field.type === 'textarea' ? (
                                    <Textarea
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        className="w-full min-h-[150px]"
                                    />
                                ) : (
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full"
                                    />
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

