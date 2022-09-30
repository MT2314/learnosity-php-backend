import InfoBox, {
  defaultProps as infoBoxDefaultProps,
} from "./InfoBox/InfoBox";
import Image, { defaultProps as imageDefaultProps } from "./Image/Image";
import QuoteBox, {
  defaultProps as quoteBoxDefaultProps,
} from "./QuoteBox/QuoteBox";
import ImageConfig from "./Image/ImageConfig";
import Video, { defaultProps as videoDefaultProps } from "./Video/Video";
import VideoConfig from "./Video/VideoConfig";
import IFrame, { defaultProps as iFrameDefaultProps } from "./IFrame/IFrame";
import IFrameConfig from "./IFrame/IFrameConfig";
import Text, { defaultProps as quillDefaultProps } from "./Text/Text";
import TabsMain, { defaultProps as testTabDefaultProps } from "./Tabs/TabsMain";
//Accordion
import AccordionMain, {
  defaultProps as testAccordionDefaultProps,
} from "./Accordion/AccordionMain";
// Category Icons
import interactiveCategoryIcon from "../Icons/categoriesIcons/interactive.png";
import mediaCategoryIcon from "../Icons/categoriesIcons/media.png";
import textCategoryIcon from "../Icons/categoriesIcons/text.png";

// Text Component Icons
import tabsComponentIcon from "../Icons/componentIcons/tabsIcon.png";
import textComponentIcon from "../Icons/componentIcons/textIcon.png";
import defaultComponentIcon from "../Icons/componentIcons/defaultIcon.png";

import exposedVersion from "../../exposedStage";

console.log(
  `Component Library stage is ${exposedVersion.stage} and version of the app is ${exposedVersion.version}`
);

export const categories = {
  interactive: {
    readableName: "Interactive",
    icon: interactiveCategoryIcon,
  },
  text: {
    readableName: "Text",
    icon: textCategoryIcon,
  },
  media: {
    readableName: "Media",
    icon: mediaCategoryIcon,
  },
};

const componentIndex = {
  InfoBox: {
    Component: InfoBox,
    readableName: "InfoBox",
    defaultProps: infoBoxDefaultProps,
    version: "0.0.1",
    category: categories.text,
  },
  Text: {
    Component: Text,
    readableName: "Text",
    defaultProps: quillDefaultProps,
    version: "0.0.1",
    category: categories.text,
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
    category: categories.media,
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
    category: categories.text,
  },
  Video: {
    Component: Video,
    readableName: "Video",
    defaultProps: videoDefaultProps,
    version: "0.0.1",
    ConfigPanel: VideoConfig,
    category: categories.media,

  },
  IFrame: {
    Component: IFrame,
    readableName: "iFrame",
    defaultProps: iFrameDefaultProps,
    version: "0.0.1",
    ConfigPanel: IFrameConfig,
    category: categories.media,
  },
  Tab: {
    Component: TabsMain,
    readableName: "Tabs",
    defaultProps: testTabDefaultProps,
    version: "0.0.1",
    category: categories.interactive,
  },
  Accordion: {
    Component: AccordionMain,
    readableName: "Accordion",
    defaultProps: testAccordionDefaultProps,
    version: "0.0.1",
    category: categories.interactive,
  },
};

export default componentIndex;
