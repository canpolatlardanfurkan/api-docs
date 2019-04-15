import * as React from "react"
import { urlFor } from "monobase"

/** Allows the use of paths to .mdx pages (otherwise the parser gets confused) */
export const Link: React.FunctionComponent<{ href: string }> = ({ href, children }) => (
    <a href={urlFor(href)}>{children}</a>
)
