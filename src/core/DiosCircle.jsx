import * as React from "react"
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg"
import { normalize } from "./size"

function DiosCircle(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={ normalize(213)}
      height={ normalize(213)}
      viewBox="0 0 213 213"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#f16771" />
          <Stop offset={1} stopColor="#efecb8" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Ellipse 33"
        cx={106.5}
        cy={106.5}
        r={106.5}
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default DiosCircle
