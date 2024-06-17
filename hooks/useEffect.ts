import { useEffect, useState } from "react"

export const secondRenderUseEffect = (callback: React.EffectCallback, deps?: React.DependencyList) => {
    const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {

        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        callback()

    }, deps)

}