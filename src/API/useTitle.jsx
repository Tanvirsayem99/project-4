import { useEffect } from "react"

const useTile = title =>{
    useEffect(()=>{
        document.title = `SUMMER SPORTS CAMP || ${title}`;
    },[title])
}

export default useTile;