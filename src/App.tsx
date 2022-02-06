import { RsvpForm } from "./components/RsvpForm"
import "./App.css"

function App() {
  const siteReady = process.env.REACT_APP_SITE_READY === "true"
  if (siteReady) {
    return (
      <div className="App">
        <RsvpForm />
      </div>
    )
  }

  return <h1>Site coming soon</h1>
}

export default App
