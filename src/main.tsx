import { render } from "preact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/cron",
    element: <App />,
  },
]);

render(
  <RouterProvider router={router} />,
  document.getElementById("root") as HTMLElement
);
