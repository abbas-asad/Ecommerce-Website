import Authpage from "../components/authpage"
import Featuressection from "../components/featuressection"
import Heroheader from "../components/heroheader"

export default function Account() {
  return (
    <main>

      <Heroheader sectionName="My account" />
      <Authpage />
      <Featuressection />
    </main>
  )
}

