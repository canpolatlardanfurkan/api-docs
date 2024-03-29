import * as React from "react"
import { FramerAPIContext } from "../contexts/FramerAPIContext"
import { PermalinkAnchor } from "../layout/Menu"

/** Allows the use of paths to .mdx pages (otherwise the parser gets confused) */
export const Ref: React.FunctionComponent<{ name: string }> = ({ name, children }) => {
    const api = React.useContext(FramerAPIContext)
    const model = api.resolve(name)
    const ref = model ? model.id : name
    return <a data-link-ref={ref}>{children}</a>
}

export const RefAnchor: React.FunctionComponent<{name: string}> = ({name}) => {
    const api = React.useContext(FramerAPIContext)
    const model = api.resolve(name)
    const ref = model ? model.id : name
    return <PermalinkAnchor id={ref} />
}
