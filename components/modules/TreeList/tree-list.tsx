"use client";

import React, { useState } from "react";
import { enableMapSet, produce } from "immer";
import { NormalisedData, NormalisedMap, TreeListPorps } from "./types";
import { TreeListHelper } from "./helper";
import { Group, Icon, Tree, TreeItem, TreeItemLabel } from "./tree-list-styles";
import Checkbox from "../../checkbox/checkbox";

/**
 * Learning purpose
 * Reference from one talented developer
 */

enableMapSet();

const TreeList = ({ data }: TreeListPorps) => {
    // =============================================================================
    // CONST, STATE, REF
    // =============================================================================
    const [selectedKeyPaths, setSelectedKeyPaths] = useState<string[][]>([["A"]]);
    const [list, setList] = useState<NormalisedMap>(
        TreeListHelper.buildSelectionState(TreeListHelper.normaliseData(data), selectedKeyPaths)
    );

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();

        // toggle expended
    };

    // =============================================================================
    // RENDER FUNCTION
    // =============================================================================
    const renderItem = (item: NormalisedData) => {
        const { key, keyPath, checked, selected, expanded, indeterminate, label, children } = item;

        return (
            <TreeItem
                role="leaf"
                key={key}
                aria-selected={selected}
                aria-expanded={!!children ? expanded : undefined}
                onClick={handleOnClick}
            >
                <TreeItemLabel $focued={false} $selected={selected}>
                    {children && <Icon aria-hidden />}
                    <Checkbox tabIndex={-1} checked={checked} indeterminate={indeterminate} />
                    {label}
                </TreeItemLabel>
                {children && expanded && (
                    <Group role="group">
                        {Array.from(children.values()).map((child) => renderItem(child))}
                    </Group>
                )}
            </TreeItem>
        );
    };

    return <Tree role="tree">{Array.from(list.values()).map((item) => renderItem(item))}</Tree>;
};

export default TreeList;
