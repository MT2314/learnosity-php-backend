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
import Tab, { defaultProps as tabsDefaultProps } from "./Tab/Tab";
import Video, { defaultProps as videoDefaultProps } from "./Video/Video";
import VideoConfig from "./Video/VideoConfig";

const componentIndex = {
  Callout: {
    Component: Callout,
    readableName: "Callout",
    defaultProps: calloutDefaultProps,
    version: "0.0.1",
  },
  NestedTest:{
    Component: NestedTest,
    readableName: "NestedTest",
    defaultProps: nestedTabsDefaultProps,
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
  Tab: {
    Component: Tab,
    readableName: "Tab",
    defaultProps: tabsDefaultProps,
    version: "0.0.1",
  },
  Video: {
    Component: Video,
    readableName: "Video",
    defaultProps: videoDefaultProps,
    version: "0.0.1",
    ConfigPanel: VideoConfig,
  },
};

export default componentIndex;
