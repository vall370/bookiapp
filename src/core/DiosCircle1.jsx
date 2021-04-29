import * as React from "react"
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg"
import { normalize } from "./size"

function DiosCircle1(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={ normalize(469)}
      height={ normalize(469)}
      viewBox="0 0 469 469"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.183}
          y1={0.14}
          x2={0.773}
          y2={0.922}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#f16771" />
          <Stop offset={1} stopColor="#05526d" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Ellipse 36"
        cx={234.5}
        cy={234.5}
        r={234.5}
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default DiosCircle1
