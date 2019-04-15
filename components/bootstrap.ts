import { highlight } from "./highlighter"

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        highlight()

        // Use the CTRL-D combo to toggle debug mode.
        document.addEventListener("keydown", (evt: KeyboardEvent) => {
            if (evt.key === "d" && evt.ctrlKey) {
                document.body.classList.toggle("debug-mode")
            }
        })

        // Disable selection of non-code blocks to improve copy-paste.
        // See: Template.tsx for applied styles.
        const aside = document.querySelector(".codebar")

        if (!aside) return
        if (typeof document.elementsFromPoint !== "function") return

        document.addEventListener(
            "mousemove",
            throttle((evt: MouseEvent) => {
                const classList = document.body.classList
                const hasCodeSelected =
                    classList.contains("is-mouseover-code") && window.getSelection().toString().length > 0
                if (hasCodeSelected) return

                const elements = Array.from(document.elementsFromPoint(evt.x, evt.y))
                const isOverCodebar = elements.indexOf(aside) >= 0
                document.body.classList.toggle("is-mouseover-code", isOverCodebar)
            }, 100)
        )

        // Clear the mouseover class so that text can be deselected.
        document.addEventListener("mousedown", evt => {
            // Don't do anything when interacting with a demo to avoid
            // slowing down interactions. Removing the class from the body
            // triggers a recalculation.
            if (evt.target.closest(".embedded-demo")) return
            document.body.classList.remove("is-mouseover-code")
        })
    })
}

function throttle(fn: Function, time: number) {
    let timer: number | null = null
    return function(this: unknown, ...args: unknown[]) {
        if (timer) return
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, time)
        fn.apply(this, args)
    }
}
