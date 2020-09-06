import profiles from "./profiles.json";

export const getApiUrl = (): string => {
  return `${profiles.local.apiUrl}`;
};

export const getImagesUrl = (): string => {
  return `${profiles.local.imagesUrl}`;
};
