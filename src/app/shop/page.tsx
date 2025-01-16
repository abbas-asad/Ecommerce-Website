import Heroheader from "../components/heroheader"
// import Dropdownmenu from '../components/dropdownmenu'
import Featuressection from "../components/featuressection"
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

