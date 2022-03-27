import { RsvpForm } from "./components/RsvpForm"
import { ContactForm } from "./components/ContactForm"
import { Venue } from "./components/Venue"
import { Map } from "./components/Map"

function App() {
  const siteReady = process.env.REACT_APP_SITE_READY === "true"
  if (siteReady) {
    return (
      <div className="App">
        <Venue />
        <RsvpForm />
        <Map />
        <br />
        <br />
        <br />
        <ContactForm />
      </div>
    )
  }

  return <h1>Site coming soon</h1>
}

export default App
