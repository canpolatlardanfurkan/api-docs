import styled from "styled-components"
import { desktop, widescreen } from "./Breakpoints"

export const Codebar = styled.aside`
    position: fixed;
    top: 0;
    right: 0;
    width: calc(50% - 125px);
    height: 100%;
    background: #151515;
    z-index: -1;

    @media (min-width: ${widescreen}) {
        left: 925px;
        width: 100%;
    }

    @media (max-width: ${desktop}) {
        background: transparent;
    }
`
