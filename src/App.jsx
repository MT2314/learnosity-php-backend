import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WidgetContextProvider } from "./Utility/mockWrapper";
// ? Theme Context Provider
import { ThemeProvider } from "@mui/material/styles";
// import Header from "./components/Header";
// import FormattedText from "./components/FormattedText";
import Home from "./pages/Home";
import AccessibilityKeysPage from "./components/FormattedText/AccessibilityKeysPage";
import CalloutPage from "./pages/CalloutPage";
import QuoteBoxPage from "./pages/QuoteBoxPage";
import ImagePage from "./pages/ImagePage";
import exposedVersion from "../exposedStage";
import Text from "./components/Text/Text";
//? Theme Import
import createMFTheme from "./theme/index";

import "./index.css";
const App = () => {
  //* Creating theme
  const textTheme = createMFTheme();

  console.log(
    `Stage is ${exposedVersion.stage} and version of the app is ${exposedVersion.version}`
  );
  return (
    <>
      <Suspense fallback="loading">
        <ThemeProvider theme={textTheme}>
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
        </ThemeProvider>
      </Suspense>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
