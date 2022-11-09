import { useEffect } from "react";

export function useOnClickOutside(ref, handler, useFocus) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    //focusin event captures if focus is outside the ref. Add 'true' argument when function is called to use the focus outside feature
    useFocus && document.addEventListener("focusin", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      useFocus && document.removeEventListener("focusin", listener);
    };
  }, [ref, handler]);
}
