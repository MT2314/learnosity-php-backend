import Callout, {
  defaultProps as calloutDefaultProps,
} from "./Callout/Callout";
import Image, { defaultProps as imageDefaultProps } from "./Image/Image";
import QuoteBox, {
  defaultProps as quoteBoxDefaultProps,
} from "./QuoteBox/QuoteBox";
import ImageConfig from "./Image/ImageConfig";
import Tab, { defaultProps as tabsDefaultProps } from "./Tab/Tab";
import Video, { defaultProps as videoDefaultProps } from "./Video/Video";
import VideoConfig from "./Video/VideoConfig";
import IFrame, { defaultProps as iFrameDefaultProps } from "./IFrame/IFrame";
import IFrameConfig from "./IFrame/IFrameConfig";
import Text, { defaultProps as quillDefaultProps } from "./Text/Text";

const categories = {
  interactive: {
    readableName: "Interactive",
    icon: ".../src/",
    components: ["Tab"],
  },
  text: {
    readableName: "Text",
    icon: "",
    components: ["Text", "Callout"],
  },
  media: {
    readableName: "Media",
    icon: "",
    components: ["Image", "IFrame", "Video"],
  },
};

const componentIndex = {
  Callout: {
    Component: Callout,
    readableName: "Callout",
    defaultProps: calloutDefaultProps,
    version: "0.0.1",
    category: "interactive",
  },
  Text: {
    Component: Text,
    readableName: "Text",
    defaultProps: quillDefaultProps,
    version: "0.0.1",
    category: "text",
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
    category: "media",
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
    category: "text",
  },
  Tab: {
    Component: Tab,
    readableName: "Tab",
    defaultProps: tabsDefaultProps,
    version: "0.0.1",
    category: "interactive",
  },
  Video: {
    Component: Video,
    readableName: "Video",
    defaultProps: videoDefaultProps,
    version: "0.0.1",
    ConfigPanel: VideoConfig, 
    category: "media",
  },
  IFrame: {
    Component: IFrame,
    readableName: "iFrame",
    defaultProps: iFrameDefaultProps,
    version: "0.0.1",
    ConfigPanel: IFrameConfig,
    category: "media",
  },
};

export default componentIndex;
