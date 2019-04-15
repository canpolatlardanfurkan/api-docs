import * as React from "react"

/**
 * Can be used to display code examples. Use with template literals for best results.
 * Leading whitespace will be trimmed and indentation preserved.
 *
 * @example
 *
 *     <Code lang="typescript">
 *     {`
 *         const meta = <Code lang="typescript">const foo = bar</Code>
 *     `}
 *     </Code>
 */
export class CodeBlock extends React.PureComponent<{ lang: string; hasLines?: boolean }> {
    render() {
        let source = this.props.children
        if (typeof this.props.children === "string") {
            source = stripLeadingIndentation(this.props.children)
        }
        return (
            <pre>
                <code className={`language-${this.props.lang}{this.props.hasLines ? ' line-numbers' : ''}`}>
                    {source}
                </code>
            </pre>
        )
    }
}

function stripLeadingIndentation(str: string): string {
    const lines = str.split("\n")
    const indent = Math.min(...lines.filter(line => line.trim()).map(line => line.search(/\S/)))
    return lines
        .map(line => line.substring(indent))
        .join("\n")
        .trim()
}
