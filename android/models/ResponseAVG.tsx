type ResponseAVG = null | {
  total: number;
  arithmeticMean: number;
  interQuartileMean: number;
  percentiles: Map<string, number>;
  prices: number[];
  classifieds: number[];
};

export default ResponseAVG;
