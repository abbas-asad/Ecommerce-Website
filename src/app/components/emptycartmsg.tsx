import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface headingProp {
  headingName: string;
}

const Emptycartmessage = (props: headingProp) => {
  return (
    <div className="container mx-auto px-medium lg:px-large py-[30vh] text-center">
      <h1 className="text-2xl font-bold mb-6">{props.headingName}</h1>
      <p className="text-gray-500 mb-4">Your cart is empty</p>
      <Link href="/shop">
        <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}

export default Emptycartmessage
