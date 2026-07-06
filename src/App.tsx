import HomePage, { modulesLoader } from "./pages/HomePage/HomePage"
import Profile, { userLoader } from "./pages/Profile/Profile"
import { createBrowserRouter, RouterProvider } from "react-router"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import Sections, { sectionsLoader } from "./pages/ModuleDetail/Sections"
import ModulePreview, { moduleLoader } from "./pages/ModuleDetail/ModulePreview"



import Register, { registerAction } from "./pages/Register/Register"
import Login, { loginAction } from "./pages/Login/Login"
import Tags, { tagsAction, tagsLoader } from "./pages/Register/Tags"
import Chat, { chatbotLoader } from "./pages/Chatbot"
import Popular from "./pages/Popular/Popular"
import CreateModule, { createModuleAction } from "./pages/Create/CreateModule"
import CreateModuleTags, { tagsActionModule } from "./pages/Create/CreateModuleTags"
import CreateModuleSections, { sectionsAction } from "./pages/Create/CreateSections"

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <HomePage />,
    loader: modulesLoader,
    errorElement: <NotFoundPage />
  }, {
    path: '/profile',
    element: <Profile />,
    loader: userLoader
  },
  {
    path: '/sections/:moduleId',
    element: <Sections />,
    loader: sectionsLoader
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
  },
  {
    path: '/chat',
    element: <Chat />,
    loader: chatbotLoader
  },
  {
    path: '/popular',
    element: <Popular />,
    loader: modulesLoader,
    errorElement: <NotFoundPage />
  },
  {
    path: '/create-module',
    element: <CreateModule />,
    action: createModuleAction
  },
  {
    path: '/create-module-tags/:moduleId',
    element: <CreateModuleTags />,
    loader: tagsLoader,
    action: tagsActionModule
  },
  {
    path: '/create-module-sections/:moduleId',
    element: <CreateModuleSections />,
    loader: sectionsLoader,
    action: sectionsAction
  }
  
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
