import * as React from "react"
import { Dynamic } from "monobase"
import { useFramer } from "../contexts/FramerContext"
import { apiClassName } from "components/documentation/helpers"

export const SliderImport = Dynamic(function SliderImport() {
    const { Frame, hasFramer } = useFramer()
    // CSS Override
    const noMarginAdded = { margin: 0 }
    return hasFramer ? (
        <Frame width="300px" height="300px" background="" style={noMarginAdded}>
            <Frame center />
        </Frame>
    ) : null
})
