import { Nav } from "./components/Nav"
import { RsvpForm } from "./components/RsvpForm"
import { ContactForm } from "./components/ContactForm"
import { Venue } from "./components/Venue"
import { Map } from "./components/Map"
import { Day } from "./components/Day"
import { Gifts } from "./components/Gifts"

function App() {
  const siteReady = process.env.REACT_APP_SITE_READY === "true"
  if (siteReady) {
    return (
      <div className="App">
        <Nav />
        <Venue />
        <RsvpForm />
        <Map />
        <Day />
        <Gifts />
        <ContactForm />
      </div>
    )
  }

  return <h1>Site coming soon</h1>
}

export default App
