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
// Category Icons
import interactiveCategoryIcon from "../Icons/categoriesIcons/interactive.png";
import mediaCategoryIcon from "../Icons/categoriesIcons/media.png";
import textCategoryIcon from "../Icons/categoriesIcons/text.png";
// DND Icons
import textDndLabel from "../Icons/dndIcons/textDnd.png"
import calloutDndLabel from "../Icons/dndIcons/calloutDnd.png"
import tabsDndLabel from "../Icons/dndIcons/tabsDnd.png"
import defaultDndLabel from "../Icons/dndIcons/defaultDnd.png"
// Text Component Icons
import tabsComponentIcon from "../Icons/componentIcons/tabsIcon.png"
import textComponentIcon from "../Icons/componentIcons/textIcon.png"
import defaultComponentIcon from "../Icons/componentIcons/defaultIcon.png"

import exposedVersion from "../../exposedStage"

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
    dndLabel: calloutDndLabel,
    componentIcon: defaultComponentIcon
  },
  Text: {
    Component: Text,
    readableName: "Text",
    defaultProps: quillDefaultProps,
    version: "0.0.1",
    category: categories.text,
    dndLabel: textDndLabel,
    componentIcon: textComponentIcon
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
    category: categories.media,
    dndLabel: defaultDndLabel,
    componentIcon: defaultComponentIcon
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
    category: categories.text,
    dndLabel: defaultDndLabel,
    componentIcon: defaultComponentIcon
  },
  Video: {
    Component: Video,
    readableName: "Video",
    defaultProps: videoDefaultProps,
    version: "0.0.1",
    ConfigPanel: VideoConfig,
    category: categories.media,
    dndLabel: defaultDndLabel,
    componentIcon: defaultComponentIcon
  },
  IFrame: {
    Component: IFrame,
    readableName: "iFrame",
    defaultProps: iFrameDefaultProps,
    version: "0.0.1",
    ConfigPanel: IFrameConfig,
    category: categories.media,
    dndLabel: defaultDndLabel,
    componentIcon: defaultComponentIcon
  },
  Tab: {
    Component: TabsMain,
    readableName: "Tabs",
    defaultProps: testTabDefaultProps,
    version: "0.0.1",
    category: categories.interactive,
    dndLabel: tabsDndLabel, 
    componentIcon: tabsComponentIcon
  },
};

export default componentIndex;
