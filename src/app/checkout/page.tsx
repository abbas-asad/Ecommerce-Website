import Checkout from "../components/checkout"
import Featuressection from "../components/layout/featuressection"
import Heroheader from "../components/layout/heroheader"

export default function Account() {
  return (
    <main>
      <Heroheader sectionName="Checkout" />
      <Checkout />
      <Featuressection />
    </main>
  )
}

