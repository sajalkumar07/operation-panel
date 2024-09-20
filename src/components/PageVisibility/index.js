import React, { useEffect, useState } from "react";
import { getBrowserVisibilityProp, getIsDocumentHidden } from "./helper";

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());

  const onVisibilityChange = () => {
    let x = getIsDocumentHidden();
    setIsVisible(x);
  };

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();
    document.addEventListener(visibilityChange, onVisibilityChange, false);
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });
  return isVisible;
}
