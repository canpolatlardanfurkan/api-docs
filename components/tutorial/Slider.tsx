import * as React from "react"
import { Dynamic } from "monobase"
import { useFramer } from "../contexts/FramerContext"

const sliderWidth = 130
const sliderHeight = 6
const sliderKnobSize = 40

// Style
const fillBg = "#fff"
const knobBg = "#fff"
const railBg = "rgba(255,255,255,.2)"
const knobShadow = "0 2px 8px 1px #242424"

// CSS overrides
const noMarginAdded = { margin: 0 }

export const Slider = Dynamic(function Slider({ min = 0, max = 1, value = 0, offsetCenter = 0, onChange }) {
    const { Frame, useMotionValue, useTransform, hasFramer } = useFramer()
    const position = useMotionValue(value * sliderWidth)
    const newValue = useTransform(position, [0, sliderWidth], [min, max])
    return hasFramer ? (
        <Frame
            name="Rail"
            width={sliderWidth}
            height={sliderHeight}
            center
            radius={sliderHeight / 2}
            borderRadius={sliderHeight / 2}
            background={railBg}
            y={offsetCenter}
            style={noMarginAdded}
        >
            <Frame
                name="Fill"
                width={position}
                height={sliderHeight}
                radius={sliderHeight / 2}
                borderRadius={sliderHeight / 2}
                background={fillBg}
                style={noMarginAdded}
            />
            <Frame
                name="Knob"
                x={position}
                size={sliderKnobSize}
                center="y"
                radius="50%"
                borderRadius="50%"
                background={knobBg}
                shadow={knobShadow}
                left={-20}
                drag="x"
                dragConstraints={{ left: 0, right: 130 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={function() {
                    if (onChange) onChange(newValue.get())
                }}
                style={{ ...noMarginAdded, cursor: "pointer" }}
            />
        </Frame>
    ) : null
})
