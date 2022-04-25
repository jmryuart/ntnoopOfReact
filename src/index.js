import React from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./components/MainPage";
import "./css/default/common.css";

const ntnoop = document.getElementById("ntnoop");
const root = createRoot(ntnoop);

root.render(<MainPage />);
