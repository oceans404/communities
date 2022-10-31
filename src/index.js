import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Buffer } from "buffer";
import { ChakraProvider } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

global.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
