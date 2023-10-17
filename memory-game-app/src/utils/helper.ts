import { ReactElement } from "react";

export function duplicatedRandomly(arr: Array<{ icon: ReactElement, value: string }>) {
    const duplicatedArray = arr.reduce((acc, current) => {
      const randomIndex = Math.floor(Math.random() * (acc.length + 1))
      const duplicate = { value: current.value, icon: current.icon }
      acc.splice(randomIndex, 0, current, duplicate);
      return acc
    }, [] as Array<{ icon: ReactElement, value: string }>)
    return duplicatedArray
  }