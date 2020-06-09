import profiles from "./profiles.json";

export const getApiUrl = (): string => {
  return `${profiles.remote.apiUrl}`;
};

export const getImagesUrl = (): string => {
  return `${profiles.remote.imagesUrl}`;
};
