import "./app.css"
import MediaManager from "./components/MediaManager"
import ShowIPOSD from "./components/ShowIPOSD"
import Socket from "./socket"

function App() {

  return (
    <Socket>
      <div className="app">
        <MediaManager />
      </div>
    </Socket>
  )
}

export default App
