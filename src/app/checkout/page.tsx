import Checkout from "../components/checkout"
import Featuressection from "../components/featuressection"
import Heroheader from "../components/heroheader"

export default function Account() {
  return (
    <main>
      <Heroheader sectionName="Checkout" />
      <Checkout />
      <Featuressection />
    </main>
  )
}

