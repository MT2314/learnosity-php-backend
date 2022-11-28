import React, {
  useImperativeHandle,
  useEffect,
  forwardRef,
  useRef,
} from "react";
import "mathlive/dist/mathlive.min";

import "mathlive/dist/mathlive-fonts.css";
import "mathlive/dist/mathlive-static.css";

const MathLiveEditor = forwardRef((props, ref) => {
  const _ref = useRef(null);

  useImperativeHandle(ref, () => _ref.current, [_ref]);

  useEffect(() => {
    if (_ref.current?.getValue() !== props.value) {
      _ref.current?.setValue(props.value || " ");
    }
  }, [props.value]);

  useEffect(() => {
    _ref.current?.addEventListener("input", () => {
      props.onEditorInput(_ref.current?.getValue());
    });

    return () => {
      _ref.current?.removeEventListener("input", () => {});
    };
  }, []);

  const attributes = {
    "keypress-sound": "none",
    "plonk-sound": "none",
  };

  return <math-field ref={_ref} {...attributes} style={props.style} />;
});

export default MathLiveEditor;
