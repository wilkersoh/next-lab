import * as React from "react";
import { SVGProps } from "react";

const CheckboxCheckedIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
        <path
            fill="currentColor"
            d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h30q.7 0 1.275.3t.925.7L39 9.2V9H9v30h30V21.85l3-3V39q0 1.25-.875 2.125T39 42Zm14.05-8.4-11.1-11.1 2.1-2.1 9 9 19.1-19.1 2.1 2.1Z"
        />
    </svg>
);

export default CheckboxCheckedIcon;
