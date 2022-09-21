//refer to the follow link for instructions on how to implement the useOnClickOutside hook. https://usehooks.com/useOnClickOutside/


import {useEffect} from "react";

export function useOnClickOutside(ref, handler) {
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
    //focusin event captures if focus is outside the ref
    document.addEventListener("focusin", listener);


    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener('focusin', listener);

    };
  }, [ref, handler]);

}
