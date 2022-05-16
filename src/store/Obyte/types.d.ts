interface IObyteSlice {
  definedData: Record<string, Omit<IDefinedBaseAAData, 'base_aa'>>;
}

interface IDefinition {
  description: string;
  homepage_url?: string;
  source_url?: string;
}

interface IBaseAAData {
  base_aa: string;
  addresses: string[];
}

interface IDefinedBaseAAData extends IBaseAAData {
  definition: IDefinition;
}
