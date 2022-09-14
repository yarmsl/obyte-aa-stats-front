interface IObyteSlice {
  definedData: Record<string, Omit<IDefinedBaseAAData, 'base_aa'>>;
  agentsCache: Record<string, IAgentCache>;
  assetsCache: Record<string, string>;
}

interface IAgentCache {
  addresses: Record<string, IAddressEntity>;
  definition: IDefinition;
}

interface IAddressEntity {
  tvl?: number;
  assets: Record<string, string>;
}

interface IAssetEntity2 {
  value: string;
  symbol: string;
}

interface IDefinition {
  description: string;
  homepage_url?: string;
  source_url?: string;
  version?: string;
  field_descriptions?: Record<string, string>;
}

interface IBaseAAData {
  base_aa: string;
  addresses: IAddressInfo[];
}

interface IAssetEntity {
  value?: string;
  symbol?: string;
}
interface IAddressInfo extends Record<string, IAssetEntity> {
  address: string;
  tvl: number;
}

interface IDefinedBaseAAData extends IBaseAAData {
  definition: IDefinition;
}
