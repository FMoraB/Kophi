import HomePage, { modulesLoader } from "./pages/HomePage/HomePage"
import Profile, { userLoader } from "./pages/Profile/Profile"
import { createBrowserRouter, RouterProvider } from "react-router"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import Sections from "./pages/ModuleDetail/Sections"
import Section from "./pages/ModuleDetail/Section"
import ModulePreview, { moduleLoader } from "./pages/ModuleDetail/ModulePreview"



import Register, { registerAction } from "./pages/Register/Register"
import Login, { loginAction } from "./pages/Login/Login"
import Tags, { tagsAction, tagsLoader } from "./pages/Register/Tags"

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <HomePage />,
    loader: modulesLoader,
    errorElement: <NotFoundPage />
  }, {
    path: '/profile/:userId',
    element: <Profile />,
    loader: userLoader
  },
  {
    path: '/sections',
    element: <Sections />,
    children:
      [
        {
          path: ':sectionId',
          element: <Section />,
        }
      ]
  },
  {
    path: "/modules/:id",
    errorElement: <NotFoundPage />,
    element: <ModulePreview />,
    loader: moduleLoader
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '/tags/:userId',
    element: <Tags />,
    loader: tagsLoader,
    action: tagsAction
  }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
