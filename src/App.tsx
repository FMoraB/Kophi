import HomePage from "./pages/HomePage/HomePage"
import Profile from "./pages/Profile/Profile"

import { modulesArray } from "./components/moduleData"
import { createBrowserRouter, RouterProvider } from "react-router"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import Sections from "./pages/ModuleDetail/Sections"
import Section from "./pages/ModuleDetail/Section"


const router = createBrowserRouter([{
  path: '/',
  element: <HomePage modules={modulesArray} />,
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

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
