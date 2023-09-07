export type NestedData = {
    label: string;
    key: string;
    children?: NestedData[];
};

export type NormalisedMap = Map<string, NormalisedData>;

export interface TreeListPorps {
    /** The options  */
    data: NestedData[];
}

export type NormalisedData = {
    label: string;
    key: string;
    keyPath: string[];
    expanded: boolean;
    selected: boolean;
    checked: boolean;
    indeterminate: boolean;
    children?: Map<string, NormalisedData>;
};
