import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../constants/routes.json";
import GeneralSettings from "./general";
import SecuritySettings from "./security";

interface UserSettingsProps {
  register: any;
  setValue: any;
  formErrors: any;
  control: any;
}

const UserSettings: React.FC<UserSettingsProps> = ({
  register,
  setValue,
  formErrors,
  control,
}) => {
  return (
    <Switch>
      <Route
        path={routes.accountSettings.general.route}
        exact
        render={() => (
          <GeneralSettings
            formErrors={formErrors}
            setValue={setValue}
            register={register}
            control={control}
          />
        )}
      />
      <Route
        path={routes.accountSettings.default.route}
        exact
        render={() => (
          <GeneralSettings
            formErrors={formErrors}
            setValue={setValue}
            register={register}
            control={control}
          />
        )}
      />
      <Route
        path={routes.accountSettings.security.route}
        exact
        render={() => (
          <SecuritySettings register={register} formErrors={formErrors} />
        )}
      />
    </Switch>
  );
};

export default UserSettings;
