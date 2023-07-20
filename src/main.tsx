import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./roots/Root.tsx";
import ErrorPage from "./error-page";
import "./index.css";
import Stopwatch from "./roots/Stopwatch.tsx";
import Timer from "./roots/Timer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "stopwatch", element: <Stopwatch /> },
      { path: "timer", element: <Timer /> },
    ],
  },
], {
  basename: '/react-ts-timer'
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
