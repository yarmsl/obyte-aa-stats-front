/* eslint-disable camelcase */
type IAgentsTemplate = Record<
  string,
  // eslint-disable-next-line no-unused-vars
  (xAsset?: string, yAsset?: string) => string
>;

export const templates: IAgentsTemplate = {
  DYZOJKX4MJOQRAUPX7K6WCEV5STMKOHI: (xAsset, yAsset) =>
    `Oswap v2 ${xAsset}-${yAsset}`,
  '2JYYNOSRFGLI3TBI4FVSE6GFBUAZTTI3': (xAsset, yAsset) =>
    `Oswap v2 ${xAsset}-${yAsset}`,
  '5WOTEURNL2XGGKD2FGM5HEES4NKVCBCR': (symbol2) =>
    `Stability Fund for Bonded Stablecoin ${symbol2}`,
  DAN6VZNKNZBKJP7GYJST5FMONZOY4FNT: (symbol) =>
    `Counterstake Bridge Export ${symbol}`,
  '3DGWRKKWWSC6SV4ZQDWEHYFRYB4TGPKX': (symbol2) =>
    `Bonded Stablecoin v2 ${symbol2}`,
  GWQVOQDPT4L5XPMDIQF5MNDQZNV5VGLY: (symbol2) =>
    `Bonded Stablecoin v2 ${symbol2}`,
  CD5DNSVS6ENG5UYILRPJPHAB3YXKA63W: (symbol2) =>
    `Bonded Stablecoin v2 ${symbol2}`,
  FCFYMFIOGS363RLDLEWIDBIIBU7M7BHP: (symbol2) =>
    `Bonded Stablecoin v1 ${symbol2}`,
  '3RNNDX57C36E76JLG2KAQSIASAYVGAYG': (symbol2) =>
    `Bonded Stablecoin v1 ${symbol2}`,
  YXPLX6Q3HBBSH2K5HLYM45W7P7HFSEIN: (symbol) =>
    `Bonded Stablecoin v2 stable AA for ${symbol}`,
  '7DTJZNB3MHSBVI72CKXRIKONJYBV7I2Z': (symbol1, reserve_symbol) =>
    `Arbitrage AA for buying/selling ${symbol1} for ${reserve_symbol} when the price deviates from the peg.`,
  WQBLYBRAMJVXDWS7BGTUNUTW2STO6LYP: (symbol1, reserve_symbol) =>
    `Arbitrage AA for buying/selling ${symbol1} for ${reserve_symbol} when the price deviates from the peg.`,
  GEZGVY4T3LK6N4NJAKNHNQIVAI5OYHPC: (symbol, symbol2) =>
    `Bonded Stablecoin Deposits for ${symbol}/${symbol2}`,
  WKGC4O5UPW37XEGQKXPINIXFAXHTYHKL: (shares_symbol) =>
    `Counterstake Bridge Export Pooled Assistant ${shares_symbol}`,
  GS23D3GQNNMNJ5TL4Z5PINZ5626WASMA: (asset0, asset1) =>
    `Oswap v1 ${asset0}-${asset1}`,
  HLSRAK6LGDXLNGXUCB5Z43NCZMVLYTJU: (shares_symbol) =>
    `Counterstake Bridge Import Pooled Assistant ${shares_symbol}`,
  AKZNFCFYJVNMM6WD4A2ZFNLM4EYXUZ2Q: (shares_symbol) =>
    `Counterstake Bridge Import Pooled Assistant ${shares_symbol}`,
  JL6OOEOQCJ2RJ3NHCUJLUBDR3ZE3GY3F: (symbol2) =>
    `Bonded Stablecoin Governance for ${symbol2}`,
  Y4VBXMROK5BWBKSYYAMUW7QUEZFXYBCF: (symbol2) =>
    `Bonded Stablecoin Governance for ${symbol2}`,
  UUPBIWDWQ7Q4WXS5CWSEKUQE34FG6L55: (symbol2) =>
    `Bonded Stablecoin Governance for ${symbol2}`,
  LXHUYEV6IHBCTGMFNSWRBBU7DGR3JTIY: (symbol2) =>
    `Bonded Stablecoin Governance for ${symbol2}`,
  JLLM2AUTHYUS5EW36YVSPDYIDDQRABU6: (symbol) => `Discount Stablecoin ${symbol}`,
  AXG7G57VBLAHF3WRN5WMQ53KQEQDRONC: (yes_symbol) =>
    `Prophet prediction market ${yes_symbol}`,
  KDHCTQOTKTO6MLYOCU6OCBI7KK72DV3P: (symbol) =>
    `Counterstake Bridge Import Governance AA for ${symbol}`,
  QXHLP4MLXSWHJGD3WUBFTXQSIA2R3QFG: (symbol2) =>
    `Bonded Stablecoin Decision Engine AA for ${symbol2}`,
  '625UKTER5WR5JQPQYS7CU4ST2EXFUCDG': (symbol2) =>
    `Bonded Stablecoin Decision Engine AA for ${symbol2}`,
  R3WZUWKTFISJ53MGAGSS5OIVMDAFC3WV: (symbol2) =>
    `Bonded Stablecoin Decision Engine AA for ${symbol2}`,
  HNAFSLWSZDU2B2PLFIUNRZLGS4F2AUIL: (symbol) =>
    `Counterstake Bridge Import ${symbol}`,
  DFMD744IOZQFN2MUCQFTSBEALINHZMXO: (symbol) =>
    `Counterstake Bridge Import ${symbol}`,
};
