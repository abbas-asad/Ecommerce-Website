import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from "lucide-react"
interface sectionNameProp {
    sectionName: string;
}

const Heroheader = (props: sectionNameProp) => {
    return (

        <div className="relative h-[300px] bg-[url('/heroheaderbg.avif')] bg-cover bg-center">
            <div className="absolute inset-0" />
            <div className="container mx-auto px-medium lg:px-large h-full flex flex-col justify-center items-center relative z-10 text-center">
                <span className="mx-2 mb-3 font-semibold">
                    <Image
                        src="/m_icon.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                    />
                </span>
                <h1 className="text-[2rem] leading-[2.5rem] lg:text-4xl font-semibold text-black mb-4 capitalize">{props.sectionName}</h1>
                <div className="text-black flex">
                    <Link href="/" className="hover:underline font-semibold">Home</Link>
                    <span className="mx-2 font-semibold"><ChevronRight /></span>
                    <span>{props.sectionName}</span>
                </div>
            </div>
        </div>
    )
}

export default Heroheader
