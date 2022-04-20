import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { RsvpForm } from "./components/RsvpForm"
import { Footer } from "./components/Footer"
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
        <Hero />
        <Venue />
        <RsvpForm />
        <Map />
        <Day />
        <Gifts />
        <Footer />
      </div>
    )
  }

  return <h1>Site coming soon</h1>
}

export default App
