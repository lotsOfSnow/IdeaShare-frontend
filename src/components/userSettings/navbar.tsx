import { Grid, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes.json";

const Navbar = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid item>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        style={{ marginBottom: "10px" }}
      >
        <Tab
          component={Link}
          to={routes.accountSettings.general.route}
          label="General"
        />
        <Tab
          component={Link}
          to={routes.accountSettings.security.route}
          label="Security"
        />
      </Tabs>
    </Grid>
  );
};

export default Navbar;
