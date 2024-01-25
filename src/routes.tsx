import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/notfound";



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/detail/:cripto',
        element: <Detail />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export { router };