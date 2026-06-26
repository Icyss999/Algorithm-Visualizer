import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getInitial = (name:string)=>{
        if (!name) return "A"
        const nameContainer = name.split(" ") 
        if (nameContainer.length > 1){
            return `${nameContainer[0][0]}${nameContainer[1][0]}`
        } else{
            return `${name[0]}`
        }
    }