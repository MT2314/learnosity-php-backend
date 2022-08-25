
import React, { Suspense } from "react";
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
import exposedVersion from "../exposedStage";
import Text from "./components/Text/Text";

import "./index.css";

const App = () => {
  console.log(
    `Stage is ${exposedVersion.stage} and version of the app is ${exposedVersion.version}`
  );
  return (
    <>
      <Suspense fallback="loading">
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
              <Route path="/text-component" element={<Text />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </WidgetContextProvider>
      </Suspense>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
