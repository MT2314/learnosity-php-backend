import React from "react";
import ReactDOM from "react-dom";
import { WidgetContextProvider } from "./Utility/mockWrapper"
// import Header from "./components/Header";
// import FormattedText from "./components/FormattedText";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AccessibilityKeysPage from './components/FormattedText/AccessibilityKeysPage';
import CalloutPage from "./pages/CalloutPage";

import "./index.css";

const App = () => {
  console.log("15.0.3");
  return (
    <>
      <WidgetContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AccessibilityKeysPage" element={<AccessibilityKeysPage />} />
            <Route path="/CalloutPage" element={<CalloutPage />} />
            
          </Routes>
        </BrowserRouter>
      </WidgetContextProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
