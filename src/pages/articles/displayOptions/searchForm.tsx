/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete, AutocompleteChangeReason } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { fetchSearchPreviewList } from "../../../features/articles/actions";
import { SET_FILTER_TITLE } from "../../../features/articles/constants";
import { ArticlePreview } from "../../../features/articles/models";
import { RootState } from "../../../store";

const useStyles = makeStyles((theme: Theme) => ({
  searchBoxShake: {
    animation: `$shake 0.82s cubic-bezier(.36,.07,.19,.97) both`,
  },
  "@keyframes shake": {
    "10%, 90%": {
      transform: "translate3d(-1px, 0, 0)",
    },

    "20%, 80%": {
      transform: "translate3d(2px, 0, 0)",
    },

    "30%, 50%, 70%": {
      transform: "translate3d(-4px, 0, 0)",
    },

    "40%, 60%": {
      transform: "translate3d(4px, 0, 0)",
    },
  },
}));

const SearchForm = () => {
  const classes = useStyles();
  const methods = useForm();

  const [open, setOpen] = useState(false);
  const { isLoaded, isLoading, list, filterTitle } = useSelector(
    (state: RootState) => state.articles.search
  );
  const [links, setLinks] = useState<Link[]>([]);
  const [optionSelected, setOptionSelected] = useState<ArticlePreview | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<{}>,
    option: ArticlePreview | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason !== "select-option" || option === null) {
      return;
    }

    setOptionSelected(option);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLoaded]);

  const handleOpen = () => {
    if (isLoaded) {
      setOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: SET_FILTER_TITLE, payload: null });
    };
  }, []);

  const onSubmit = (data: any) => {
    dispatch({ type: SET_FILTER_TITLE, payload: data.search });
    dispatch(fetchSearchPreviewList());
  };

  return (
    <Grid item style={{ marginLeft: "auto" }}>
      {optionSelected && <Redirect to={`articles/${optionSelected.id}`} />}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid
          container
          justify="flex-end"
          alignContent="flex-end"
          alignItems="flex-end"
        >
          <Grid item>
            <FormControl>
              <Autocomplete
                open={open}
                style={{ width: 200 }}
                options={list}
                loading={isLoading}
                clearOnBlur={false}
                className={methods.errors.search && classes.searchBoxShake}
                getOptionLabel={option =>
                  `${option.author}: ${option.title as string}`
                }
                onChange={handleChange}
                onOpen={handleOpen}
                onClose={() => setOpen(false)}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    label="What are you looking for?"
                    id="input-with-icon-adornment"
                    name="search"
                    inputRef={methods.register({ required: true })}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            <SearchIcon />
                          )}
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default SearchForm;
