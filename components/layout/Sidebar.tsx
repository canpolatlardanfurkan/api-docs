import * as React from "react"
import { Navigation } from "../Navigation"
import styled from "styled-components"
import { Dynamic } from "monobase"
import { tablet } from "./Breakpoints"
import { menuTextColor } from "../theme"

const Home = styled.div`
    display: flex;
    height: 60px;
    place-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding: 15px 20px;

    a {
        color: ${menuTextColor};
    }

    @media (max-width: ${tablet}) {
        padding: 15px 20px;
        margin-bottom: 0;
    }
`

const Icon = styled.div`
    display: inline-block;
    position: relative;
    top: 2px;
`

const Toggle = styled.div`
    position: absolute;
    right: 20px;
    z-index: 1000;

    @media (min-width: ${tablet}) {
        display: none;
    }
`

const SideBarWrapper = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background: #fafafa;
    border-right: 1px solid #eee;
    overflow-y: auto;
    transition: none;
    z-index: 1000;
    padding-bottom: 20px;

    &.has-clicked {
        transition: height 0.2s ease;
    }

    @media (max-width: ${tablet}) {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #eee;
        z-index: 2000;
        user-select: none;
        height: 60px;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;

        &.is-open {
            height: 100vh;
            overflow: auto;
        }
    }
`

const MobileToggle: React.FunctionComponent = () => {
    // Use class to handle the click event. Ideally we'd pass a callback
    // from the Sidebar component but we can't make that dynamic right now
    // because the menu items need to access the Monobase context and that's
    // not available clientside.
    const onClick = React.useCallback((evt: React.MouseEvent<HTMLElement>) => {
        evt.preventDefault()
        const sidebar = document.querySelector(".side-bar-wrapper")
        if (sidebar) {
            sidebar.classList.add("has-clicked")
            sidebar.classList.toggle("is-open")
        }
    }, [])
    return (
        <Toggle onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M2 4h16v2H2zM2 9h16v2H2zM2 14h16v2H2z" fill="hsl(0, 0%, 0%)" />
            </svg>
        </Toggle>
    )
}

const DynamicMobileToggle = Dynamic(MobileToggle)

const VersionBadgeBackground = styled.div`
    position: absolute;
    right: 18px;
    color: #666;
    background: #eee;
    padding: 4px 9px 2px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 12px;

    @media (max-width: ${tablet}) {
        position: relative;
        margin-left: 30px;
    }
`

const VersionBadge: React.FunctionComponent<{ version: string }> = props => {
    return <VersionBadgeBackground>v&#8202;&#8202;{props.version}</VersionBadgeBackground>
}

export const Sidebar: React.FunctionComponent = () => (
    <SideBarWrapper className="side-bar-wrapper">
        <Home>
            <a href="/api/">
                <Icon>
                    <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="10" height="15">
                        <path d="M10 0v5H5L0 0zM0 5h5l5 5H5v5l-5-5z" fill="rgba(0, 0, 0, 1.00)" />
                    </svg>
                </Icon>
                <span style={{ fontWeight: 600, paddingTop: "3px", letterSpacing: "-0.5px" }}>API</span>
            </a>
            <VersionBadge version="1.0" />

            <DynamicMobileToggle />
        </Home>

        <Navigation />
    </SideBarWrapper>
)
