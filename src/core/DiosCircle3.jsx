import * as React from "react"
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg"
import { normalize } from "./size"

function DiosCircle3(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={ normalize(145)}
      height={ normalize(145)}
      viewBox="0 0 145 145"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.867}
          y1={0.209}
          x2={0.114}
          y2={0.811}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#75c4c3" />
          <Stop offset={0.402} stopColor="#75c4c3" />
          <Stop offset={1} stopColor="#efecb8" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Ellipse 35"
        cx={72.5}
        cy={72.5}
        r={72.5}
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default DiosCircle3
