import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { WidgetContextProvider } from "./Utility/mockWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import Header from "./components/Header";
// import FormattedText from "./components/FormattedText";
import Home from "./pages/Home";
import AccessibilityKeysPage from "./components/FormattedText/AccessibilityKeysPage";
import CalloutPage from "./pages/CalloutPage";
import QuoteBoxPage from "./pages/QuoteBoxPage";
import ImagePage from "./pages/ImagePage";
import exposedVersion from "../exposedStage";
import Text from "./components/Text/Text";
import QuizMain from "./components/Quiz/QuizMain";

import "./index.css";

const App = () => {
  console.log(
    `Stage is ${exposedVersion.stage} and version of the app is ${exposedVersion.version}`
  );
  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
                <Route path="/Quiz" element={<QuizMain />} />
                <Route path="/text-component" element={<Text />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </WidgetContextProvider>
        </Suspense>
      </DndProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
