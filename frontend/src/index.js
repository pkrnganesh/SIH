import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomeRoutes } from "./routes/routes.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeRoutes />
  </React.StrictMode>
);
