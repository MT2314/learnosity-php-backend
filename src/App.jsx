import React from "react";
import ReactDOM from "react-dom";
import { WidgetContextProvider } from "./Utility/mockWrapper";
// import Header from "./components/Header";
// import FormattedText from "./components/FormattedText";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AccessibilityKeysPage from "./components/FormattedText/AccessibilityKeysPage";
import CalloutPage from "./pages/CalloutPage";
import QuoteBoxPage from "./pages/QuoteBoxPage";
import ImagePage from "./pages/ImagePage";

import "./index.css";

const App = () => {
  console.log("17.0.5");
  return (
    <>
      <WidgetContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/AccessibilityKeysPage"
              element={<AccessibilityKeysPage />}
            />
            <Route path="/CalloutPage" element={<CalloutPage />} />
            <Route path="/QuoteBoxPage" element={<QuoteBoxPage />} />
            <Route path="/ImagePage" element={<ImagePage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </WidgetContextProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
