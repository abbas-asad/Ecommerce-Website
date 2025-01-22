import Contactsection from '../components/contactsection'
import Featuressection from '../components/layout/featuressection'
import Heroheader from '../components/layout/heroheader'

const Contact = () => {
    return (
        <main>
            <Heroheader sectionName="Contact" />
            <Contactsection />
            <Featuressection />
        </main>

    )
}

export default Contact
