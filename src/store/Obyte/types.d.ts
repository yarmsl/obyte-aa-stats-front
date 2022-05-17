interface IObyteSlice {
  definedData: Record<string, Omit<IDefinedBaseAAData, 'base_aa'>>;
  addresses: string[];
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
  addresses: string[];
}

interface IDefinedBaseAAData extends IBaseAAData {
  definition: IDefinition;
}
