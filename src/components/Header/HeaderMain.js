import React from "react";
import { v4 as uuidv4 } from "uuid";
import { HeaderProvider } from "./HeaderContext";
import Header from "./subcomponents/Header";

export const defaultProps = {
  headerState: {
    size: "large",
    alignment: "left-align",
    heading: "",
  },
};

const HeaderMain = ({
  headerState = defaultProps,
  setProp = () => {},
  //   setActiveComponent = () => {},
}) => {
  return (
    <HeaderProvider headerState={headerState} setProp={setProp}>
      <Header
      //   setTabActive={setTabActive}
      //   setActiveComponent={setActiveComponent}
      />
    </HeaderProvider>
  );
};

export default HeaderMain;
