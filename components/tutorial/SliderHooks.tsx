import * as React from "react"
import { Dynamic } from "monobase"
import { useFramer } from "../contexts/FramerContext"

export const SliderHooks = Dynamic(function SliderHooks() {
    const { Frame, hasFramer } = useFramer()

    // Layout
    const sliderWidth = 130
    const sliderHeight = 6
    const sliderKnobSize = 40

    // Style
    const fillBg = "#fff"
    const knobBg = "#fff"
    const railBg = "rgba(255,255,255,.2)"
    const knobShadow = "0 2px 8px 1px #242424"

    // CSS Override
    const noMarginAdded = { margin: 0 }

    const [position, setPosition] = React.useState(65)

    return hasFramer ? (
        <Frame width="300px" height="300px" background="" style={noMarginAdded}>
            <Frame
                width={sliderWidth}
                height={sliderHeight}
                center
                borderRadius={sliderHeight / 2}
                radius={sliderHeight / 2}
                background={railBg}
                style={noMarginAdded}
            >
                <Frame
                    width={position}
                    height={sliderHeight}
                    borderRadius={sliderHeight / 2}
                    radius={sliderHeight / 2}
                    background={fillBg}
                    center="y"
                    style={noMarginAdded}
                />
                <Frame
                    x={position}
                    size={sliderKnobSize}
                    borderRadius="50%"
                    radius="50%"
                    center="y"
                    left={-sliderKnobSize / 2}
                    background={knobBg}
                    shadow={knobShadow}
                    drag="x"
                    dragConstraints={{ left: 0, right: 130 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={function(event, { point }) {
                        setPosition(point.x)
                    }}
                    style={{ ...noMarginAdded, cursor: "pointer" }}
                />
            </Frame>
        </Frame>
    ) : null
})
