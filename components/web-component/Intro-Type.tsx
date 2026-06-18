import { TypeAnimation } from "react-type-animation";



export function IntroType (){
    return(
        <TypeAnimation
            sequence={[
                "Hello everyone!",
                1000,
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