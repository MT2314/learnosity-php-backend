import * as React from "react";
import "mathlive/dist/mathlive.min";

import "mathlive/dist/mathlive-fonts.css";
import "mathlive/dist/mathlive-static.css";

const MathLiveEditor = React.forwardRef((props, ref) => {
  const _ref = React.useRef(null);

  React.useImperativeHandle(ref, () => _ref.current, [_ref]);

  React.useEffect(() => {
    if (_ref.current?.getValue() !== props.value) {
      _ref.current?.setValue(props.value || " ");
    }
  }, [props.value]);

  const attributes = {
    "keypress-sound": "none",
    "plonk-sound": "none",
  };

  return <math-field ref={_ref} {...attributes} style={props.style} />;
});

export default MathLiveEditor;
