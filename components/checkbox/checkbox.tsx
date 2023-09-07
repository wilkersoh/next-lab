import React, { useImperativeHandle, useRef } from "react";
import { Container, Input, SelectionIndicator } from "./checkbox-styles";
import { CheckboxProps } from "./types";
import CheckboxMixedIcon from "../icons/checkbox-mixed-icon";
import CheckboxCheckedIcon from "../icons/checkbox-checked-icon";
import CheckboxBlankIcon from "../icons/checkbox-blank-icon";

const Component = (
    { checked, indeterminate, ...otherProps }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
        <Container>
            <Input type="checkbox" ref={inputRef} checked={checked} {...otherProps} />
            <SelectionIndicator>
                {indeterminate ? (
                    <CheckboxMixedIcon />
                ) : checked ? (
                    <CheckboxCheckedIcon />
                ) : (
                    <CheckboxBlankIcon />
                )}
            </SelectionIndicator>
        </Container>
    );
};

const Checkbox = React.forwardRef(Component);

export default Checkbox;
