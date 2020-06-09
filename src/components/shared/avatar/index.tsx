/* eslint-disable import/prefer-default-export */
import { Avatar, AvatarProps, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface StyleProps {
  spacing: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  avatar: {
    width: props => theme.spacing(props.spacing),
    height: props => theme.spacing(props.spacing),
    backgroundColor: theme.palette.primary.main,
  },
}));

type CustomAvatarProps = AvatarProps & {
  size?: "small" | "medium" | "large" | "very large" | "huge";
};

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  alt,
  size,
  children,
}: CustomAvatarProps) => {
  const getSpacing = (): number => {
    switch (size) {
      case "small":
        return 3;
      case "large":
        return 7;
      case "very large":
        return 9;
      case "huge":
        return 15;
      default:
        return 5;
    }
  };

  const classes = useStyles({ spacing: getSpacing() });

  const renderWithoutSrcIfEmpty = () => {
    if (src !== null && src !== undefined && src?.trim().length > 0) {
      return (
        <Avatar className={classes.avatar} src={src} alt={alt}>
          {children}
        </Avatar>
      );
    }
    return (
      <Avatar alt={alt} src="/broken-image.jpg" className={classes.avatar}>
        {children}
      </Avatar>
    );
  };

  return renderWithoutSrcIfEmpty();
};
