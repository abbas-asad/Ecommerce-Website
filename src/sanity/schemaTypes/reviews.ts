import { Eye } from "lucide-react";

export const reviewsSchema = {
    name: "review",
    title: "Review",
    type: "document",
    icon: Eye,
    fields: [
        {
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule: any) => Rule.required().min(1).max(5),
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "user",
            title: "User",
            type: "object",
            fields: [
                {
                    name: "name",
                    title: "Name",
                    type: "string",
                },
                {
                    name: "email",
                    title: "Email",
                    type: "string",
                },
            ],
        },
        {
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        },
    ],
}

