import React, { useState } from "react";
import QuoteBox, { defaultProps } from "../components/QuoteBox/QuoteBox";

const MockStateWrapper = ({ Component }) => {
  const [state, setState] = useState({ ...defaultProps });
  return (
    <Component
      setProp={(stateUpdate) =>
        setState((state) => ({ ...state, ...stateUpdate }))
      }
      {...state}
    />
  );
};

export const QuoteBoxPage = () => {
  return (
    <>
      <div>
        <MockStateWrapper Component={QuoteBox} />
      </div>
    </>
  );
};

export default QuoteBoxPage;
