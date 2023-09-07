import { produce } from "immer";
import { NestedData, NormalisedData, NormalisedMap } from "./types";

export namespace TreeListHelper {
    export const normaliseData = (data: NestedData[]) => {
        const normalise = (item: NestedData, keyPath: string[]): NormalisedData => {
            return {
                label: item.label,
                key: item.key,
                keyPath: [...keyPath, item.key],
                expanded: false,
                selected: false,
                checked: false,
                indeterminate: false,
                children: item.children && toMap(item.children, [...keyPath, item.key]),
            };
        };

        const toMap = (list: NestedData[], keyPath: string[]) => {
            const map: NormalisedMap = new Map();

            for (const item of list) {
                map.set(item.key, normalise(item, keyPath));
            }

            return map;
        };

        return toMap(data, []);
    };

    export const buildSelectionState = (data: NormalisedMap, selectedKeyPaths: string[][]) => {
        return produce(data, (draft) => {
            const update = (item: NormalisedData) => {
                const isSelected = !!selectedKeyPaths.find((keyPath) =>
                    isEqual(keyPath, item.keyPath)
                );

                if (item.children) {
                    /**
                     * go to find innermost first
                     * javascript Stack is as example for two tier
                     *
                     * first execution to find innermost
                     * [
                     *   execute item.children.forEach until innermost item, that item.children will be false
                     *   execute item.children.forEach
                     *   first trigger update fn
                     * ]
                     *
                     * stack pop up after update innermost item, to run logics below item.children.forEach
                     * [
                     *   execute fn below item.children.forEach. (the item is the innermost'parent object)
                     *   execute item.children.forEach
                     *   first trigger update fn
                     * ]
                     */
                    item.children.forEach((child) => update(child));

                    // find checked status under the subItem
                    const checkCount = [...item.children.values()].filter(
                        (child) => child.checked
                    ).length;
                    const totalCount = [...item.children.values()].length;

                    const isChecked = item.children.size > 0 && checkCount === totalCount;
                    const isIndeterminate =
                        [...item.children.values()].some((child) => child.indeterminate) ||
                        (checkCount > 0 && !isChecked);

                    item.selected = isSelected;
                    item.checked = isChecked;
                    item.indeterminate = isIndeterminate;
                } else {
                    item.selected = isSelected;
                    item.checked = isSelected;
                    item.indeterminate = false;
                }
            };

            draft.forEach((item) => update(item));
        });
    };

    export const getItemAtKeyPath = (
        data: NormalisedMap,
        keyPath: string[]
    ): NormalisedData | undefined => {
        /**
         * recursively loop depend on keyPath
         * @param keyPath ['A', 'A'] || ['A', 'B'] etc
         */
        const [currKey, ...remainingKeys] = keyPath;
        const item = data.get(currKey);
        if (!remainingKeys.length || !item) {
            return item;
        }

        return getItemAtKeyPath(item.children!, remainingKeys);
    };

    export const getSubitemsAtKeyPath = (data: NormalisedMap, keyPath: string[]): string[][] => {
        const item = getItemAtKeyPath(data, keyPath);

        // this very cool. smart
        const getSubItem = (item: NormalisedData): string[][] => {
            if (item.children) {
                return [...item.children.values()].map((child) => getSubItem(child)).flat();
            }
            return [item.keyPath];
        };

        return item ? getSubItem(item) : [];
    };

    export const isEqual = (a: string[], b: string[]) => {
        // check each value and index all matches.
        if (a.length !== b.length) return false;

        for (let i = 0; i < b.length; i++) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    };
}
