import { RsvpForm } from "./components/RsvpForm"
import { ContactForm } from "./components/ContactForm"
// import { Map } from "./components/Map"
import "./App.css"

function App() {
  const siteReady = process.env.REACT_APP_SITE_READY === "true"
  if (siteReady) {
    return (
      <div className="App">
        <RsvpForm />
        <br />
        <br />
        <div>{/* <Map /> */}</div>
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
