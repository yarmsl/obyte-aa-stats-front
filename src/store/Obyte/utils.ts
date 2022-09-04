/* eslint-disable camelcase */
import { apiGetDef } from 'lib/api';
import { Client } from 'obyte';

/** Get info about address` assets from obyte.js in accordance with https://docs.google.com/spreadsheets/d/1AeLeNnPKpXS4UXCwqL9rSh9DuvKKGyabji08nmSgBfI/edit#gid=0 */
export const getXYAssetsInfo = async (
  address: string,
  client: Client
): Promise<{ xAsset: string; yAsset?: string } | undefined> => {
  try {
    const info = await client.api.getDefinition(address);
    if ('base_aa' in info[1] && 'params' in info[1]) {
      const { base_aa, params } = info[1];
      // Obyte exchange protocol v2
      if (
        [
          'DYZOJKX4MJOQRAUPX7K6WCEV5STMKOHI',
          '2JYYNOSRFGLI3TBI4FVSE6GFBUAZTTI3',
        ].includes(base_aa)
      ) {
        if ('x_asset' in params && 'y_asset' in params)
          return {
            xAsset: params.x_asset,
            yAsset: params.y_asset,
          };
      }

      // Stability Fund for Bonded Stablecoins, Bonded Stablecoin Governance AA, Bonded Stablecoin Decision Engine AA.
      if (
        [
          '5WOTEURNL2XGGKD2FGM5HEES4NKVCBCR',
          'JL6OOEOQCJ2RJ3NHCUJLUBDR3ZE3GY3F',
          'Y4VBXMROK5BWBKSYYAMUW7QUEZFXYBCF',
          'UUPBIWDWQ7Q4WXS5CWSEKUQE34FG6L55',
          'LXHUYEV6IHBCTGMFNSWRBBU7DGR3JTIY',
          'QXHLP4MLXSWHJGD3WUBFTXQSIA2R3QFG',
          '625UKTER5WR5JQPQYS7CU4ST2EXFUCDG',
          'R3WZUWKTFISJ53MGAGSS5OIVMDAFC3WV',
        ].includes(base_aa)
      ) {
        if ('curve_aa' in params) {
          const stateVars = await client.api.getAaStateVars({
            address: params.curve_aa,
          });
          if ('asset2' in stateVars)
            return { xAsset: (stateVars as { asset2: string }).asset2 };
        }
      }

      // Counterstake Bridge Export AA.
      if (base_aa === 'DAN6VZNKNZBKJP7GYJST5FMONZOY4FNT') {
        if ('asset' in params) {
          return { xAsset: params.asset };
        }
      }

      // Bonded Stablecoins AA
      if (
        [
          '3DGWRKKWWSC6SV4ZQDWEHYFRYB4TGPKX',
          'FCFYMFIOGS363RLDLEWIDBIIBU7M7BHP',
          '3RNNDX57C36E76JLG2KAQSIASAYVGAYG',
          'GWQVOQDPT4L5XPMDIQF5MNDQZNV5VGLY',
          'CD5DNSVS6ENG5UYILRPJPHAB3YXKA63W',
        ].includes(base_aa)
      ) {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('asset2' in stateVars)
          return { xAsset: (stateVars as { asset2: string }).asset2 };
      }

      // Bonded Stablecoin Stable AA.
      if (base_aa === 'YXPLX6Q3HBBSH2K5HLYM45W7P7HFSEIN') {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('asset' in stateVars)
          return { xAsset: (stateVars as { asset: string }).asset };
      }

      // Arbitrage AA for buying/selling T1 tokens for the reserve currency when the price deviates from the peg.
      if (
        [
          '7DTJZNB3MHSBVI72CKXRIKONJYBV7I2Z',
          'WQBLYBRAMJVXDWS7BGTUNUTW2STO6LYP',
        ].includes(base_aa)
      ) {
        if ('curve_aa' in params) {
          const [stateVars, curveDef] = await Promise.all([
            client.api.getAaStateVars({
              address: params.curve_aa,
            }),
            client.api.getDefinition(params.curve_aa),
          ]);
          if (
            'asset1' in stateVars &&
            'params' in curveDef[1] &&
            'reserve_asset' in curveDef[1].params
          )
            return {
              xAsset: (stateVars as { asset1: string }).asset1,
              yAsset: curveDef[1].params.reserve_asset,
            };
        }
      }

      // Bonded Stablecoin Deposits AA.
      if (base_aa === 'GEZGVY4T3LK6N4NJAKNHNQIVAI5OYHPC') {
        if ('curve_aa' in params) {
          const [stateVars, stateVarsCurveAA] = await Promise.all([
            client.api.getAaStateVars({ address }),
            client.api.getAaStateVars({ address: params.curve_aa }),
          ]);
          if ('asset' in stateVars && 'asset2' in stateVarsCurveAA)
            return {
              xAsset: (stateVars as { asset: string }).asset,
              yAsset: (stateVarsCurveAA as { asset2: string }).asset2,
            };
        }
      }

      // Counterstake Bridge Export Pooled Assistant AA, Counterstake Bridge Import Pooled Assistant AA.
      if (
        [
          'WKGC4O5UPW37XEGQKXPINIXFAXHTYHKL',
          'HLSRAK6LGDXLNGXUCB5Z43NCZMVLYTJU',
          'AKZNFCFYJVNMM6WD4A2ZFNLM4EYXUZ2Q',
        ].includes(base_aa)
      ) {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('shares_asset' in stateVars)
          return {
            xAsset: (stateVars as { shares_asset: string }).shares_asset,
          };
      }

      // Obyte exchange protocol
      if (
        [
          'GS23D3GQNNMNJ5TL4Z5PINZ5626WASMA',
          'B22543LKSS35Z55ROU4GDN26RT6MDKWU',
        ].includes(base_aa)
      ) {
        if ('asset0' in params && 'asset1' in params)
          return { xAsset: params.asset0, yAsset: params.asset1 };
      }

      // Discount Stablecoins AA.
      if (base_aa === 'JLLM2AUTHYUS5EW36YVSPDYIDDQRABU6') {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('asset' in stateVars)
          return {
            xAsset: (stateVars as { asset: string }).asset,
          };
      }

      // Prophet prediction markets
      if (base_aa === 'AXG7G57VBLAHF3WRN5WMQ53KQEQDRONC') {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('yes_asset' in stateVars)
          return {
            xAsset: (stateVars as { yes_asset: string }).yes_asset,
          };
      }

      // Counterstake Bridge Import Governance AA.
      if (base_aa === 'KDHCTQOTKTO6MLYOCU6OCBI7KK72DV3P') {
        if ('import_aa' in params) {
          const stateVars = await client.api.getAaStateVars({
            address: params.import_aa,
          });
          if ('asset' in stateVars)
            return {
              xAsset: (stateVars as { asset: string }).asset,
            };
        }
      }

      // Counterstake Bridge Import AA.
      if (
        [
          'HNAFSLWSZDU2B2PLFIUNRZLGS4F2AUIL',
          'DFMD744IOZQFN2MUCQFTSBEALINHZMXO',
        ].includes(base_aa)
      ) {
        const stateVars = await client.api.getAaStateVars({ address });
        if ('asset' in stateVars)
          return { xAsset: (stateVars as { asset: string }).asset };
      }
    }

    return undefined;
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    throw new Error('getXYAssetsInfo error');
  }
};

export const getDefData = async (
  address: string,
  client: Client
): Promise<IDefinition> => {
  try {
    const res = await client.api.getDefinition(address);
    if ('base_aa' in res[1]) {
      const def = await client.api.getDefinition(res[1].base_aa);
      return apiGetDef<IDefinition>(def[1].doc_url);
    }
    if ('doc_url' in res[1]) return apiGetDef<IDefinition>(res[1].doc_url);
    throw new Error('doc_url or base_aa is absent');
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    throw new Error('getDefFData error');
  }
};

export const getDefAddresses = async (
  addresses: IRenderAATvl[],
  client: Client
): Promise<IDefinedBaseAAData[]> => {
  const res = addresses.map(async (address) => {
    const temp = await client.api.getDefinition(address.address);
    if ('base_aa' in temp[1]) {
      return { address, base_aa: temp[1].base_aa as string };
    }
    return { address, base_aa: address.address };
  });
  const adressesArr = await Promise.all(res);
  const baseArr = [...new Set(adressesArr.map((a) => a.base_aa))];

  const res2 = baseArr.map(async (base) => {
    const addrss = adressesArr
      .filter((a) => a.base_aa === base)
      .map(async (a) => {
        const assets = await getXYAssetsInfo(a.address.address, client);
        if (assets) {
          if (assets.xAsset && assets.yAsset)
            return {
              address: a.address.address,
              tvl: a.address.usd_balance,
              xAsset: assets.xAsset,
              yAsset: assets.yAsset,
            };
          return {
            address: a.address.address,
            tvl: a.address.usd_balance,
            xAsset: assets.xAsset,
          };
        }
        return { address: a.address.address, tvl: a.address.usd_balance };
      });
    return {
      base_aa: base,
      addresses: (await Promise.all(addrss)) as IAddressInfo[],
      definition: { description: '' },
    };
  });
  return Promise.all(res2);
};

export const getSymbol = async (
  asset: string,
  client: Client
): Promise<string> => {
  const registry = client.api.getOfficialTokenRegistryAddress();
  const symbol = await client.api.getSymbolByAsset(registry, asset);
  return symbol;
};
