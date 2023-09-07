import styled from "styled-components";
import { CaretRightIcon } from "@lifesg/react-icons";

// =============================================================================
// STYLE INTERFACE
// =============================================================================
interface TreeItemLabelStyle {
    $focued: boolean;
    $selected: boolean;
}

// =============================================================================
// STYLE INTERFACE
// =============================================================================
export const Tree = styled.ul`
    margin: 0;
    list-style: none;
`;

export const TreeItemLabel = styled.div<TreeItemLabelStyle>`
    display: flex;
    align-items: center;

    ${(props) =>
        props.$selected &&
        `
    background: #dea;
    font-weight: 500;
  `}
`;

export const TreeItem = styled.li`
    margin: 0;
    list-style: none;
    outline: none;

    &:focus > ${TreeItemLabel} {
        outline: 1px solid blue;
    }
`;

export const Group = styled.ul`
    margin: 0 0 0 2rem;
`;

export const Icon = styled(CaretRightIcon)`
    height: 1.5rem;
    width: 1.5rem;
`;
