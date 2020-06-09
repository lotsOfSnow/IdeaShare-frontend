import { Fab, Slide } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BasicTooltip from "./shared/tooltip/basic";

const ScrollToTopButton: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleClick = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const render = () => {
    return (
      <Slide
        direction="up"
        in={scrollPosition >= 300}
        mountOnEnter
        unmountOnExit
      >
        <BasicTooltip title="Go to top" placement="top">
          <Fab
            style={{ position: "fixed", bottom: "100px" }}
            color="secondary"
            onClick={handleClick}
          >
            <ArrowUpward />
          </Fab>
        </BasicTooltip>
      </Slide>
    );
  };

  return render();
};

export default ScrollToTopButton;
