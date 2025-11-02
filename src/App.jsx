import React from "react";

import Home from "./components/Home";
import Skills from "./components/Skills";
import { FloatingDockDemo } from "./components/FloatingDockPreview";
import {LiquidEther} from './components/LiquidEther'

export default function App() {
  return (
    <>
    <LiquidEther />
      <div className="fixed z-20 -mt-56 mr-196">
        <FloatingDockDemo />
      </div>
      <Home />
      <Skills />
    </>
  );
}
