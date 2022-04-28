import React, { useEffect, useRef, forwardRef } from "react";
import styles from "./TextEditable.module.scss";

// This is the plain text only version of ContentEditable, which is an external library for
// editting HTML content

const TextEditable = forwardRef(
  ({ value, placeholder = "text input", multiline = false, ...props }, ref) => {
    const input = useRef(null);
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(input.current);
      } else {
        ref.current = input.current;
      }
    }, [ref]);

    useEffect(() => {
      if (input && input.current) changeSize(input.current);
    }, [input, value]);

    const changeSize = (textInput) => {
      if (textInput) {
        if (!multiline) {
          /* Auto resize width */
          textInput.style.width = 0;
          textInput.style.width = textInput.scrollWidth + 10 + "px";
        } else {
          /* Auto resize height */
          textInput.style.height = 0;
          textInput.style.height = textInput.scrollHeight + "px";
        }
      }
    };

    // const combineFunc = (funcA, funcB) => {
    //   return (...p) => {
    //     if (funcA) funcA(...p);
    //     if (funcB) return funcB(...p);
    //   };
    // };

    if (multiline) {
      return (
        <textarea
          ref={input}
          aria-label={placeholder}
          placeholder={placeholder}
          draggable
          className={styles.TextEditable__Multiline}
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          // {...props}
          // value={value || ""}
          // onInput={combineFunc((e) => changeSize(e.target), props.onInput)}
          // onChange={combineFunc((e) => changeSize(e.target), props.onChange)}
        />
      );
    } else {
      return (
        <input
          ref={input}
          type="text"
          aria-label={placeholder}
          placeholder={placeholder}
          draggable
          className={styles.TextEditable__Singleline}
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          // {...props}
          // value={value || ""}
          // onInput={combineFunc((e) => changeSize(e.target), props.onInput)}
          // onChange={combineFunc((e) => changeSize(e.target), props.onChange)}
        />
      );
    }
  }
);

export default TextEditable;
