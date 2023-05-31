import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const el = document.createElement("div");
      document.body.appendChild(el);
      setContainer(el);

      return () => {
        document.body.removeChild(el);
      };
    }
  }, []);

  return container ? ReactDOM.createPortal(children, container) : null;
};
