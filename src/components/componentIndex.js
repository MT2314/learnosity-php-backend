import Callout, {
  defaultProps as calloutDefaultProps,
  categoryProps as calloutCategoryProps
} from "./Callout/Callout";
import Image, { defaultProps as imageDefaultProps, categoryProps as imageCategoryProps } from "./Image/Image";
import QuoteBox, {
  defaultProps as quoteBoxDefaultProps,
  categoryProps as quoteBoxCategoryProps
} from "./QuoteBox/QuoteBox";
import ImageConfig from "./Image/ImageConfig";
import Tab, { defaultProps as tabsDefaultProps, categoryProps as tabsCategoryProps } from "./Tab/Tab";
import Video, { defaultProps as videoDefaultProps, categoryProps as videoCategoryProps } from "./Video/Video";
import VideoConfig from "./Video/VideoConfig";
import IFrame, { defaultProps as iFrameDefaultProps, categoryProps as iframeCategoryProps } from "./IFrame/IFrame";
import IFrameConfig from "./IFrame/IFrameConfig";
import Text, {
  defaultProps as quillDefaultProps,
  categoryProps as textCategoryProps
} from "./Text/Text";

const componentIndex = {
  Callout: {
    Component: Callout,
    readableName: "Callout",
    defaultProps: calloutDefaultProps,
    version: "0.0.1",
    categoryProps: calloutCategoryProps
  },
  Text: {
    Component: Text,
    readableName: "Text",
    defaultProps: quillDefaultProps,
    version: "0.0.1",
    categoryProps: textCategoryProps
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
    categoryProps: imageCategoryProps
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
    categoryProps: quoteBoxCategoryProps
  },
  Tab: {
    Component: Tab,
    readableName: "Tab",
    defaultProps: tabsDefaultProps,
    version: "0.0.1",
    categoryProps: tabsCategoryProps
  },
  Video: {
    Component: Video,
    readableName: "Video",
    defaultProps: videoDefaultProps,
    version: "0.0.1",
    ConfigPanel: VideoConfig,
    categoryProps: videoCategoryProps
  },
  IFrame: {
    Component: IFrame,
    readableName: "iFrame",
    defaultProps: iFrameDefaultProps,
    version: "0.0.1",
    ConfigPanel: IFrameConfig,
    categoryProps: iframeCategoryProps
  },
};

export default componentIndex;
