type ModelAdvertisement = null | {
  linkToView: Map<string, string>;
  stateData: StateData;
  photoData: PhotoData;
  autoData: AutoData;
  locationCityName: Map<string, string>;
};

type StateData = null | {
  regionName: Map<string, string>;
};

type PhotoData = null | {
  seoLinkB: Map<string, string>;
};

type AutoData = null | {
  year: Map<string, string>;
  race: Map<string, string>;
};

export default ModelAdvertisement;
