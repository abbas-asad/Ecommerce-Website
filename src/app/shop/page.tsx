import Heroheader from "../components/layout/heroheader"
// import Dropdownmenu from '../components/dropdownmenu'
import Featuressection from "../components/layout/featuressection"
import Productcards from "../components/productcards"

export default function ShopPage() {
  return (
    <main>
      <Heroheader sectionName="Shop" />
      {/* <Dropdownmenu /> */}
      <Productcards headingName="Furniture Collection" para="Explore our exquisite range of furniture, crafted to add elegance and functionality to every corner of your home." />
      <Featuressection />
    </main>
  )
}

