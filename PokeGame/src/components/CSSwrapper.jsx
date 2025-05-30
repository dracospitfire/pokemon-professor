import { useEffect } from "react";

function cssWrapper({ className }) {
  useEffect(() => {
    if (className) {
      document.body.className = className;
    }
    return () => {
      if (className) {
        document.body.className = "";
      }
    };
  }, [className]);

  return null;
      
}

export default cssWrapper;