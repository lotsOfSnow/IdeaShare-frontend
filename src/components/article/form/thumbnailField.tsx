import {
  Box,
  Button,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import theme from "../../../styles/Theme";

const ThumbnailField: React.FC = () => {
  const { getValues } = useFormContext();
  const [image, setImage] = React.useState(getValues("featuredImage"));

  const fileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Grid
      item
      xs
      container
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Box
        border={1}
        borderColor={theme.palette.grey[500]}
        width={1}
        height={1}
      >
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography align="center" variant="h6">
              Select an image that will be used as the thumbnail and cover photo
              of your article:
            </Typography>
          </Grid>
          <Grid item>
            {image && (
              <img
                alt="Article thumbnail"
                src={image}
                style={{ objectFit: "contain", width: "100%", maxHeight: 400 }}
              />
            )}
          </Grid>
          <Grid item>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={fileChange}
              name="featuredImage"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="secondary" component="span">
                Browse...
              </Button>
            </label>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ThumbnailField;
