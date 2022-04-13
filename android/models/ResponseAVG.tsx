type ResponseAVG = null | {
  arithmeticMean: null | number;
  classifieds: null | number[];
  interQuartileMean: null | number;
  percentiles: null | Map<string, number>;
  prices: null | number[];
  total: null | number;
};

export default ResponseAVG;
