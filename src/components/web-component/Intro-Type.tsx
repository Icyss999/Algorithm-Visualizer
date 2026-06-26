"use client"
import { TypeAnimation } from "react-type-animation";
import { useStore } from "@nanostores/react";
import { authClient } from "@/src/lib/authClient";


export function IntroType (){

     const {data:session} = useStore(authClient.useSession)
     const name = session?.user.name ?? ""
    return(
        <TypeAnimation
            sequence={[
                `Hello, welcome to icyrhythm`,
                3000,
                "Want to learn algorithm?",
                2000,
                "This is the perfect place!",
                3000
            ]}
            wrapper="span"
            speed={50}
            style={{fontSize: '2em', display: 'inline-block', color: "white", fontFamily: "monospace", textDecoration:"bold"}}
            repeat={Infinity}
        />
    )
}