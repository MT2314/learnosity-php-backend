import React, { useState } from "react";
import Callout, { defaultProps } from "../components/Callout/Callout";

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

export const CalloutPage = () => {
  return (
    <>
      <div>
        {/* <Callout /> */}
        <MockStateWrapper Component={Callout} />
      </div>
    </>
  );
};

export default CalloutPage;
