// import Heroheader from "../components/layout/heroheader"
import AllProductCards from "../components/all-product-cards"
// import Dropdownmenu from '../components/dropdownmenu'
// import WhyChooseUs from "../components/layout/why-choose-us"


export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 space-y-12">
          <AllProductCards
            title="Shop Now"
            subtitle="Discover our extensive collection of products."
            queryCondition='_type == "product"'
            scrollable={false}
          />
        </div>
      </main>
    </div>
  )
}

