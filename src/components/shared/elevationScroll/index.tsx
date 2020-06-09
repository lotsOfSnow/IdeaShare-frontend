import { useScrollTrigger } from "@material-ui/core";
import React, { ReactChild, ReactElement } from "react";

const ElevationScroll = ({
  children,
}: {
  children: ReactChild[] | ReactChild;
}) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  if (React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement<any>, {
      elevation: trigger ? 4 : 0,
    });
  }

  throw new TypeError(`${children} is not a valid ReactElement.`);
};

export default ElevationScroll;
