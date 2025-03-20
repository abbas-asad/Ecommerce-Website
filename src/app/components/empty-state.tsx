// import Image from "next/image";
import { Button } from "@/components/ui/button"; // ShadCN button import

interface EmptyStateProps {
    title?: string;
    description?: string;
    // image?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function EmptyState({
    title = "Nothing here yet",
    description = "Looks like there's nothing to show here.",
    // image = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop", // Default empty state image
    buttonText,
    onButtonClick,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-44">
            {/* <Image src={image} alt="Empty State" width={200} height={200} /> */}
            <h2 className="text-lg font-semibold mt-4">{title}</h2>
            <p className="text-gray-500 mt-2">{description}</p>
            {buttonText && onButtonClick && (
                <Button onClick={onButtonClick} className="mt-4">
                    {buttonText}
                </Button>
            )}
        </div>
    );
}
