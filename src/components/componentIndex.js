import InfoBox, {
  defaultProps as infoBoxDefaultProps,
} from "./InfoBox/InfoBox";
import Image, { defaultProps as imageDefaultProps } from "./Image/Image";
import QuoteBox, {
  defaultProps as quoteBoxDefaultProps,
} from "./QuoteBox/QuoteBox";
import ImageConfig from "./Image/ImageConfig";
import VideoMain, {
  defaultProps as videoDefaultProps,
} from "../components/Video/VideoMain";
import IFrame, { defaultProps as iFrameDefaultProps } from "./IFrame/IFrame";
import IFrameConfig from "./IFrame/IFrameConfig";
import Text, { defaultProps as quillDefaultProps } from "./Text/Text";
import TabsMain, { defaultProps as testTabDefaultProps } from "./Tabs/TabsMain";
import TableMain from "./Table/TableMain";
//Accordion
import AccordionMain, {
  defaultProps as testAccordionDefaultProps,
} from "./Accordion/AccordionMain";
// Header
import HeaderMain, {
  defaultProps as headerDefaultProps,
} from "./Header/HeaderMain";
// Category Icons
import interactiveCategoryIcon from "../Icons/categoriesIcons/interactive.png";
import mediaCategoryIcon from "../Icons/categoriesIcons/media.png";
import textCategoryIcon from "../Icons/categoriesIcons/text.png";

// Component Icons
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
  Header: {
    Component: HeaderMain,
    readableName: "Header",
    defaultProps: headerDefaultProps,
    version: "0.0.1",
    category: categories.text,
    componentIcon: defaultComponentIcon,
  },
  InfoBox: {
    Component: InfoBox,
    readableName: "InfoBox",
    defaultProps: infoBoxDefaultProps,
    version: "0.0.1",
    category: categories.text,
    componentIcon: defaultComponentIcon,
  },
  Text: {
    Component: Text,
    readableName: "Text",
    defaultProps: quillDefaultProps,
    version: "0.0.1",
    category: categories.text,
    componentIcon: textComponentIcon,
  },
  Image: {
    Component: Image,
    readableName: "Image",
    defaultProps: imageDefaultProps,
    version: "0.0.1",
    ConfigPanel: ImageConfig,
    category: categories.media,
    componentIcon: defaultComponentIcon,
  },
  QuoteBox: {
    Component: QuoteBox,
    readableName: "Quote Box",
    defaultProps: quoteBoxDefaultProps,
    version: "0.0.1",
    category: categories.text,
    componentIcon: defaultComponentIcon,
  },
  IFrame: {
    Component: IFrame,
    readableName: "iFrame",
    defaultProps: iFrameDefaultProps,
    version: "0.0.1",
    ConfigPanel: IFrameConfig,
    category: categories.media,
    componentIcon: defaultComponentIcon,
  },
  Tab: {
    Component: TabsMain,
    readableName: "Tabs",
    defaultProps: testTabDefaultProps,
    version: "0.0.1",
    category: categories.interactive,
    componentIcon: tabsComponentIcon,
  },
  Accordion: {
    Component: AccordionMain,
    readableName: "Accordion",
    defaultProps: testAccordionDefaultProps,
    version: "0.0.1",
    category: categories.interactive,
    componentIcon: defaultComponentIcon,
  },
  Video: {
    Component: VideoMain,
    defaultProps: videoDefaultProps,
    readableName: "Video",
    version: "0.0.1",
    category: categories.media,
    componentIcon: defaultComponentIcon,
  },
  Table: {
    Component: TableMain,
    defaultProps: null,
    readableName: "Table",
    version: "0.0.1",
    category: categories.media,
    componentIcon: defaultComponentIcon,
  },
};

export default componentIndex;
