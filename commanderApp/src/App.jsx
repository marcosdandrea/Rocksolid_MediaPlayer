import "./app.css"
import "./theme.css"
import DisplaysContainer from "./components/DisplaysContainer"
import Socket from "./socket"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MediaExplorer from "./components/MediaExplorer";

function App() {

  return (
    <div className="app">
      <Socket>
        <PanelGroup direction="horizontal">
          <Panel>
            <DisplaysContainer />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={15} maxSize={20} minSize={10}>
            <MediaExplorer />
          </Panel>
        </PanelGroup>
      </Socket>
    </div>

  )
}

export default App
