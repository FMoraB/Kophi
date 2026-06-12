import HomePage from "./pages/HomePage/HomePage"
import Profile from "./pages/Profile/Profile"
import { useModules } from "./hooks/useModuleData"
import { createBrowserRouter, RouterProvider } from "react-router"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import Sections from "./pages/ModuleDetail/Sections"
import Section from "./pages/ModuleDetail/Section"



function App() {
  const { modules, loading, error } = useModules();
  const router = createBrowserRouter([{
    path: '/',
    element: <HomePage modules={modules} />,
    errorElement: <NotFoundPage />
  }, {
    path: '/profile/:userId',
    element: <Profile></Profile>
  },
  {
    path: '/sections',
    element: <Sections />,
    children:
      [
        {
          path: ':sectionId',
          element: <Section />
        }
      ]
  }
  ])

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
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
