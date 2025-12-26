import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import Lenis from "@studio-freight/lenis";


// const lenis = new Lenis({
//   smooth: true,
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
  
);
