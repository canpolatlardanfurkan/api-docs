import { createContext, useContext } from "react"

// framer package doesn't support SSR
type Framer = typeof import("framer")
const framer = typeof window === "undefined" ? null : require("framer")

const FramerContext = createContext({ ...framer, hasFramer: !!framer })

export const useFramer: () => Framer & { hasFramer: boolean } = () => useContext(FramerContext)
