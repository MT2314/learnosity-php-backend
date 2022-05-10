import React, { useState } from "react";
import Image, {
  defaultProps as imageDefaultProps,
} from "../components/Image/Image";

const MockStateWrapper = ({ Component }) => {
  const [state, setState] = useState({ ...imageDefaultProps });
  return (
    <Component
      setProp={(stateUpdate) =>
        setState((state) => ({ ...state, ...stateUpdate }))
      }
      {...state}
    />
  );
};

export const ImagePage = () => {
  return (
    <>
      <div>
        <MockStateWrapper Component={Image} />
      </div>
    </>
  );
};

export default ImagePage;
