import * as React from "react"
import styled from "styled-components"

const Table = styled.table`
    font-size: 15px;
    line-height: 1.5;
    box-shadow: 0 0 0 1px #eee;
    border-collapse: collapse;
    border-radius: 6px;
    overflow: hidden;
    width: 100%;

    p {
        font-size: 13px;
        color: #666;
        margin-bottom: 0;
    }
    th {
        font-weight: 500;
        text-align: left;
        color: #444;
    }
    th,
    td {
        padding: 10px;
    }
    tr {
        border-top: 1px solid #eee;
    }
    tr:first-child {
        border-top: none;
    }
    tr:nth-child(even) {
        background: #fafafa;
    }
    .description {
        font-weight: 400;
        display: block;
    }
    .type {
        color: #999;
    }

    ul {
        margin-top: 10px;
        font-size: 13px;
        color: #666;
        margin-bottom: 0;
    }

    code {
        background: transparent;
        padding: 0;
        font-size: inherit;
        font-family: inherit;
        font-weight: 500 !important;
        color: inherit !important;
    }
`

/**
 * The documentation for a single parameter/argument to a method/function.
 * @param props.name - The name of the parameter
 * @param props.type - The type of the parameter
 * @param props.children - Further documentation e.g. an APIOverview
 */
export const APIParam: React.FunctionComponent<{ name: string; type: string }> = ({ name, type, children }) => {
    return (
        <tr>
            <th>
                {name}: <span className="type">{type}</span>
                <div className="description">{children}</div>
            </th>
        </tr>
    )
}

/**
 * Displays a table of function/method arguments.
 * @param props.children - A list of <APIParam> elements.
 */
export const APIParams: React.FunctionComponent = ({ children }) => {
    return <Table>{children}</Table>
}
