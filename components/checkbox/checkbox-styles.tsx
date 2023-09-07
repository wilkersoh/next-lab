import styled from "styled-components";
import { CaretRightIcon } from "@lifesg/react-icons";

// =============================================================================
// STYLE INTERFACE
// =============================================================================

export const Container = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
`;

export const Input = styled.input`
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;

    &:disabled {
        cursor: not-allowed;
    }
`;

export const SelectionIndicator = styled.div`
    height: 100%;
    width: 100%;
    color: #3070c5;

    ${Input}:hover:checked + & {
        color: #204b83;
    }

    ${Input}:checked + & {
        color: #3070c5;
    }

    ${Input}:indeterminate + & {
        color: #3070c5;
    }

    ${Input}:disabled + & {
        color: #bcc4db;
    }
`;
