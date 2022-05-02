import Callout, { defaultProps as calloutDefaultProps } from "./Callout/Callout";
import Image, { defaultProps as imageDefaultProps } from "./Image/Image";
import FormattedText, { defaultProps as formattedTextDefaultProps } from "./FormattedText/FormattedText";
import ImageConfig from "./Image/ImageConfigNew";
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
    ConfigPanel: ImageConfig
  },
};

export default componentIndex;
