# Outline developer workflow/experience for modifying widgets

## Component-library
* Widgets components are located in [component-library/widgets/components](./components)
* Widgets components are built in ./dist/widgets/

### Components has to be exported as default component
```javascript
const Component1 = (props) => {
	...

	...
}
export default Component1;
```

### Change relative paths to absolute paths
```javascript
(x) import { useConfigContext } from "../../context";
(o) import { useConfigContext } from "context";

(x) import { ComponentControl } from "../Control";
(o) import { ComponentControl } from "components/Control";
```

Build components edited or created
```shell
$ cd component-library
$ npm run build-widgets
```

## lesson-builder
Import components from dependency
```javascript
import { Callout, Video, IFrame, Image } from '@publishing-platform/component-library/dist/widgets';
```

# Locally test develop component-library widgets in lesson-builder
```shell
$ cd component-library
$ npm run update-widgets
```

# Install component-library widgets from registry in lesson-builder
* dev
```shell
$ npm install @publishing-platform/component-library@next
```

* prod
```shell
$ npm install @publishing-platform/component-library@latest
```