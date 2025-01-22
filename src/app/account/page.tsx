import Authpage from "../components/authpage"
import Featuressection from "../components/layout/featuressection"
import Heroheader from "../components/layout/heroheader"

export default function Account() {
  return (
    <main>

      <Heroheader sectionName="My account" />
      <Authpage />
      <Featuressection />
    </main>
  )
}

