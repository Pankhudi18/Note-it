import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)){
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null){
            if(typeof initialValue === "function"){
                return (initialValue as () => T)()  //we are doing typecasting here in thsi step
            } else{
                return initialValue
            }
        } else{
            return JSON.parse(jsonValue)
        }
    })

    //this is used to save the data in local storaage wheneevr the value or key changes
    useEffect(() =>
    {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}