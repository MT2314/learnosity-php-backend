import Callout, {
  defaultProps as calloutDefaultProps,
} from "./Callout/Callout";
import Image, { defaultProps as imageDefaultProps } from "./Image/Image";
import FormattedText, {
  defaultProps as formattedTextDefaultProps,
} from "./FormattedText/FormattedText";
import QuoteBox, {
  defaultProps as quoteBoxDefaultProps,
} from "./QuoteBox/QuoteBox";
import ImageConfig from "./Image/ImageConfig";
import Tabs, { defaultProps as tabsDefaultProps } from "./Tabs/Tabs";
import SahilTab, {
  defaultProps as sahilTabDefaultProps,
} from "./SahilTab/SahilTab";

const componentIndex = {
  Callout: {
    Component: Callout,
    readableName: "Callout",
    defaultProps: calloutDefaultProps,
    version: "0.0.1",
  },
  FormattedText: {
    Component: FormattedText,
    readableName: "Formatted Text",
    defaultProps: formattedTextDefaultProps,
    version: "0.0.1",
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
  },
  Tabs: {
    Component: Tabs,
    readableName: "Tabs",
    defaultProps: tabsDefaultProps,
    version: "0.0.1",
  },
  sahilTab: {
    Component: SahilTab,
    defaultProps: sahilTabDefaultProps, 
    readableName: "Sahil Tab",
    version: "0.0.1",
  },
};

export default componentIndex;
