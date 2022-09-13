/* eslint-disable camelcase */
type IAgentsTemplate = Record<
  string,
  // eslint-disable-next-line no-unused-vars
  (addressInfo: IAddressInfo) => string
>;

const getPrinted = (assetEntity: IAssetEntity): string => {
  if (assetEntity) {
    if (assetEntity.symbol) return assetEntity.symbol;
    if (assetEntity.value) return assetEntity.value.substring(0, 5);
  }
  return '';
};

export const templates: IAgentsTemplate = {
  DYZOJKX4MJOQRAUPX7K6WCEV5STMKOHI: ({ x_asset, y_asset }) =>
    `Oswap v2 ${getPrinted(x_asset)}-${getPrinted(y_asset)}`,
  '2JYYNOSRFGLI3TBI4FVSE6GFBUAZTTI3': ({ x_asset, y_asset }) =>
    `Oswap v2 ${getPrinted(x_asset)}-${getPrinted(y_asset)}`,
  '5WOTEURNL2XGGKD2FGM5HEES4NKVCBCR': ({ asset2 }) =>
    `Stability Fund for Bonded Stablecoin ${getPrinted(asset2)}`,
  DAN6VZNKNZBKJP7GYJST5FMONZOY4FNT: ({ asset }) =>
    `Counterstake Bridge Export ${getPrinted(asset)}`,
  '3DGWRKKWWSC6SV4ZQDWEHYFRYB4TGPKX': ({ asset2 }) =>
    `Bonded Stablecoin v2 ${getPrinted(asset2)}`,
  GWQVOQDPT4L5XPMDIQF5MNDQZNV5VGLY: ({ asset2 }) =>
    `Bonded Stablecoin v2 ${getPrinted(asset2)}`,
  CD5DNSVS6ENG5UYILRPJPHAB3YXKA63W: ({ asset2 }) =>
    `Bonded Stablecoin v2 ${getPrinted(asset2)}`,
  FCFYMFIOGS363RLDLEWIDBIIBU7M7BHP: ({ asset2 }) =>
    `Bonded Stablecoin v1 ${getPrinted(asset2)}`,
  '3RNNDX57C36E76JLG2KAQSIASAYVGAYG': ({ asset2 }) =>
    `Bonded Stablecoin v1 ${getPrinted(asset2)}`,
  YXPLX6Q3HBBSH2K5HLYM45W7P7HFSEIN: ({ asset }) =>
    `Bonded Stablecoin v2 stable AA for ${getPrinted(asset)}`,
  '7DTJZNB3MHSBVI72CKXRIKONJYBV7I2Z': ({ asset1, reserve_asset }) =>
    `Arbitrage AA for buying/selling ${getPrinted(asset1)} for ${getPrinted(
      reserve_asset
    )} when the price deviates from the peg.`,
  WQBLYBRAMJVXDWS7BGTUNUTW2STO6LYP: ({ asset1, reserve_asset }) =>
    `Arbitrage AA for buying/selling ${getPrinted(asset1)} for ${getPrinted(
      reserve_asset
    )} when the price deviates from the peg.`,
  GEZGVY4T3LK6N4NJAKNHNQIVAI5OYHPC: ({ asset, asset2 }) =>
    `Bonded Stablecoin Deposits for ${getPrinted(asset)}/${getPrinted(asset2)}`,
  WKGC4O5UPW37XEGQKXPINIXFAXHTYHKL: ({ shares_asset }) =>
    `Counterstake Bridge Export Pooled Assistant ${getPrinted(shares_asset)}`,
  GS23D3GQNNMNJ5TL4Z5PINZ5626WASMA: ({ asset0, asset1 }) =>
    `Oswap v1 ${getPrinted(asset0)}-${getPrinted(asset1)}`,
  HLSRAK6LGDXLNGXUCB5Z43NCZMVLYTJU: (shares_symbol) =>
    `Counterstake Bridge Import Pooled Assistant ${shares_symbol}`,
  AKZNFCFYJVNMM6WD4A2ZFNLM4EYXUZ2Q: ({ shares_asset }) =>
    `Counterstake Bridge Import Pooled Assistant ${getPrinted(shares_asset)}`,
  JL6OOEOQCJ2RJ3NHCUJLUBDR3ZE3GY3F: ({ asset2 }) =>
    `Bonded Stablecoin Governance for ${getPrinted(asset2)}`,
  Y4VBXMROK5BWBKSYYAMUW7QUEZFXYBCF: ({ asset2 }) =>
    `Bonded Stablecoin Governance for ${getPrinted(asset2)}`,
  UUPBIWDWQ7Q4WXS5CWSEKUQE34FG6L55: ({ asset2 }) =>
    `Bonded Stablecoin Governance for ${getPrinted(asset2)}`,
  LXHUYEV6IHBCTGMFNSWRBBU7DGR3JTIY: ({ asset2 }) =>
    `Bonded Stablecoin Governance for ${getPrinted(asset2)}`,
  JLLM2AUTHYUS5EW36YVSPDYIDDQRABU6: ({ asset }) =>
    `Discount Stablecoin ${getPrinted(asset)}`,
  AXG7G57VBLAHF3WRN5WMQ53KQEQDRONC: ({ yes_asset }) =>
    `Prophet prediction market ${getPrinted(yes_asset)}`,
  KDHCTQOTKTO6MLYOCU6OCBI7KK72DV3P: ({ asset }) =>
    `Counterstake Bridge Import Governance AA for ${getPrinted(asset)}`,
  QXHLP4MLXSWHJGD3WUBFTXQSIA2R3QFG: ({ asset2 }) =>
    `Bonded Stablecoin Decision Engine AA for ${getPrinted(asset2)}`,
  '625UKTER5WR5JQPQYS7CU4ST2EXFUCDG': ({ asset2 }) =>
    `Bonded Stablecoin Decision Engine AA for ${getPrinted(asset2)}`,
  R3WZUWKTFISJ53MGAGSS5OIVMDAFC3WV: ({ asset2 }) =>
    `Bonded Stablecoin Decision Engine AA for ${getPrinted(asset2)}`,
  HNAFSLWSZDU2B2PLFIUNRZLGS4F2AUIL: ({ asset }) =>
    `Counterstake Bridge Import ${getPrinted(asset)}`,
  DFMD744IOZQFN2MUCQFTSBEALINHZMXO: ({ asset }) =>
    `Counterstake Bridge Import ${getPrinted(asset)}`,
};
