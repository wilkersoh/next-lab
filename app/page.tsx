import React from "react";
import { Metadata } from "next";
import TreeList from "../components/modules/TreeList/tree-list";

export const metadata: Metadata = {
    title: "Wilker's Playground",
};

const RootIndex = () => {
    return (
        <div>
            <TreeList
                data={[
                    {
                        label: "Group A",
                        key: "A",
                        children: [
                            {
                                label: "Subgroup A",
                                key: "A",
                                children: [
                                    { label: "Item A", key: "A" },
                                    { label: "Item B", key: "B" },
                                ],
                            },
                            {
                                label: "Subgroup B",
                                key: "B",
                                children: [
                                    { label: "Item B", key: "B" },
                                    { label: "Item C", key: "C" },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Group 1",
                        key: "1",
                        children: [
                            {
                                label: "Subgroup 1",
                                key: "1",
                                children: [
                                    { label: "Item A", key: "A" },
                                    { label: "Item B", key: "B" },
                                ],
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default RootIndex;
