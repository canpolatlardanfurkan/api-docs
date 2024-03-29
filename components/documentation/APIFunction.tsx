import * as React from "react"
import { MethodModel, Kind } from "../../api"
import { FramerAPIContext } from "../contexts/FramerAPIContext"
import { APIOverviewElement } from "./APIOverview"
import { MissingModelWarning } from "./MissingModelWarning"
import { ReleaseBadge } from "./ReleaseBadge"
import { DeprecatedNotice } from "./DeprecatedNotice"
import { Grid } from "components/layout/Grid"
import { Permalink } from "../layout/Menu"
import { APIParam, APIParams } from "./APIParams"
import { apiClassName } from "./helpers"

/**
 * Displays API information about a particular function.
 * @param props - A MethodModel object.
 */
export const APIFunctionElement: React.FunctionComponent<MethodModel> = props => {
    const signatures = [props].concat(props.overloads).map(method => (
        <h3 key={method.id}>
            <Permalink id={method.id} name={props.name + "()"} skipnav />
            <code className="language-typescript">{method.signature}</code> <ReleaseBadge {...props} />
        </h3>
    ))

    const parameters = props.parameters.map(param => (
        <APIParam key={param.id} name={param.name} type={param.type}>
            <APIOverviewElement className="description" {...param} fallback={<em>None</em>} />
        </APIParam>
    ))
    if (props.returnType !== "void" || props.returnMarkup) {
        parameters.push(
            <APIParam key="return" name="returns" type={props.returnType}>
                <APIOverviewElement id={props.id} summaryMarkup={props.returnMarkup} />
            </APIParam>
        )
    }
    const overviewFallback = (
        <p>
            <em>Undocumented</em>
        </p>
    )
    return (
        <Grid className={apiClassName("function", props, React.Children.toArray(props.children))}>
            {signatures}
            <DeprecatedNotice {...props} />
            <APIOverviewElement {...props} fallback={overviewFallback} />
            {props.children}
            {parameters.length ? <APIParams>{parameters}</APIParams> : null}
        </Grid>
    )
}

/**
 * Displays API information about a particular function. As functions can
 * have multiple signatures an optional `overloadIndex` prop can be used
 * to display a specific one. Otherwise the first function will be used.
 *
 * @remarks
 * Properties on the loaded `MethodModel` can be overriden to provied
 * custom signatures or other changes using the `overrides` prop.
 * @param props.name - The name of the method to display.
 * @param props.overrides - An object containing properties of MethodModel to override.
 */
export const APIFunction: React.FunctionComponent<{
    name: string
    overloadIndex?: number
    overrides?: Partial<MethodModel>
}> = props => {
    const { name, overrides } = props
    const api = React.useContext(FramerAPIContext)
    const model = api.resolve(name, Kind.Function)
    if (!model) return <MissingModelWarning name={name} kind={Kind.Function} />

    return (
        <APIFunctionElement {...model} {...overrides}>
            {props.children}
        </APIFunctionElement>
    )
}
