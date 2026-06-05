import HomePage from "./components/Home/HomePage"
import { modulesArray } from "./components/moduleData"

function App() {
  return (
    <>
      <div>
        <HomePage modules={modulesArray} />
      </div>
    </>
  )
}

export default App
