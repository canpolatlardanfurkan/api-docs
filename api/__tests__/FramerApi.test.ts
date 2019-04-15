import data from "../__fixtures__/example.data"
import { FramerAPI } from "../FramerAPI"
import { Kind } from "../types"

function createFramerAPI() {
    return new FramerAPI(data as any)
}

describe("get()", () => {
    it("returns a model for the id", () => {
        const api = createFramerAPI()
        const result = api.get("(MyClass:class)")
        expect(result && result.id).toBe("(myclass:class)")
    })

    it("returns null if not found", () => {
        const api = createFramerAPI()
        const result = api.get("carrot cake")
        expect(result).toBe(null)
    })
})

describe("resolve()", () => {
    it("looks up items by id", () => {
        const api = createFramerAPI()
        const selectors = [
            "(MyClass:class)",
            "(MyClass:class).(myMethod:instance)",
            // This format is unspecified by TSDoc, its unclear how to
            // reference an overloaded instance method.
            "(MyClass:class).(myMethod:instance,1)",
            "(MyClass:class).(myMethod:instance).(param1:parameter)",
            "(MyClass:class).(myProperty:instance)",
            "(MyClass:class).(myStaticMethod:static)",
            "(MyClass:class).(myStaticProperty:static)",
            "(MyClass:constructor)",
            "(MyInterface:interface)",
            // This wont work with with TSDoc parser as it doesn't support
            // zero indexed overloads...
            "(MyInterface:interface).(myMethodSignature:0)",
            "(MyInterface:interface).myPropertySignature",
            "(MyNamespace:namespace)",
            "(MyNamespace:namespace).(myNamespaceFunction:function)",
            "(MyNamespace:namespace).(myNamespaceVariable:variable)",
            "(MyNamespace:namespace).(myNamespaceInterface:interface)",
            "(MyNamespace:namespace).myNamespaceType",
            "(myFunction:function)",
            "(myfunction:function).(param1:parameter)",
            "(my_variable:variable)",
            "MyType",
            "(MyEnum:enum)",
            "(MyEnum:enum).myField1",
        ]

        selectors.forEach(selector => {
            const result = api.resolve(selector)
            expect(result).toBeDefined()
            expect(result && result.id).toBe(selector.toLowerCase())
        })
    })

    it("looks up items by partial match", () => {
        const api = createFramerAPI()
        const selectors = {
            MyClass: "(MyClass:class)",
            "MyClass.myMethod": "(MyClass:class).(myMethod:instance)",
            "MyClass.myProperty": "(MyClass:class).(myProperty:instance)",
            "MyClass.myStaticMethod": "(MyClass:class).(myStaticMethod:static)",
            "MyClass.myStaticProperty": "(MyClass:class).(myStaticProperty:static)",
            MyInterface: "(MyInterface:interface)",
            "MyInterface.myMethodSignature": "(MyInterface:interface).(myMethodSignature:0)",
            "MyInterface.myPropertySignature": "(MyInterface:interface).myPropertySignature",
            MyNamespace: "(MyNamespace:namespace)",
            "MyNamespace.myNamespaceFunction": "(MyNamespace:namespace).(myNamespaceFunction:function)",
            "MyNamespace.myNamespaceVariable": "(MyNamespace:namespace).(myNamespaceVariable:variable)",
            "MyNamespace.MyNamespaceInterface": "(MyNamespace:namespace).(myNamespaceInterface:interface)",
            "MyNamespace.myNamespaceType": "(MyNamespace:namespace).myNamespaceType",
            MyType: "mytype",
            myFunction: "(myFunction:function)",
            MY_VARIABLE: "(my_variable:variable)",
            MyEnum: "(MyEnum:enum)",
            "MyEnum.myField1": "(MyEnum:enum).myField1",
        }

        Object.entries(selectors).forEach(([query, selector]) => {
            const result = api.resolve(query)
            expect(result).toBeDefined()
            expect(result && result.id).toBe(selector.toLowerCase())
        })
    })

    it("strips parentheses for convenience", () => {
        const api = createFramerAPI()
        const selectors = {
            "MyClass()": "(MyClass:class)",
            "MyClass.myMethod()": "(MyClass:class).(myMethod:instance)",
            "MyClass.myStaticMethod()": "(MyClass:class).(myStaticMethod:static)",
            "MyInterface.myMethodSignature()": "(MyInterface:interface).(myMethodSignature:0)",
            "MyNamespace.myNamespaceFunction()": "(MyNamespace:namespace).(myNamespaceFunction:function)",
            "myFunction()": "(myFunction:function)",
        }

        Object.entries(selectors).forEach(([query, selector]) => {
            const result = api.resolve(query)
            expect(result).toBeDefined()
            expect(result && result.id).toBe(selector.toLowerCase())
        })
    })

    it("deals with namespaces that extend other instances", () => {
        const api = createFramerAPI()
        const selectors = {
            "MyExtendedEnum.MyExtendedEnumField": "(MyExtendedEnum:enum).MyExtendedEnumField",
            "MyExtendedEnum.myExtendedEnumMethod": "(MyExtendedEnum:namespace).(myExtendedEnumMethod:function)",
        }

        Object.entries(selectors).forEach(([query, selector]) => {
            const result = api.resolve(query)
            expect(result).toBeDefined()
            expect(result && result.id).toBe(selector.toLowerCase())
        })
    })

    it("allows a type hint to be provided", () => {
        const api = createFramerAPI()
        const result = api.resolve("MyExtendedEnum", Kind.Namespace)
        expect(result).toBeDefined()
        expect(result && result.id).toBe("(myextendedenum:namespace)")

        const result2 = api.resolve("MyExtendedEnum", Kind.Enum)
        expect(result2).toBeDefined()
        expect(result2 && result2.id).toBe("(myextendedenum:enum)")
    })
})
