import HomePage from "./components/Home/HomePage"

import { useModules } from "./hooks/useModuleData"

function App() {
  const { modules, loading, error } = useModules();
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-2xl">Loading Kophi data...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }
  if (!modules) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-2xl">No modules data available</div>
      </div>
    );
  }
  return (
    <>
      <div>
        <HomePage modules={modules} />
      </div>
    </>
  )
}

export default App
