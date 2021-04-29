import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Circle } from "react-native-svg"

function BookiCircle4(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={324}
      height={324}
      viewBox="0 0 324 324"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.8}
          y1={0.091}
          x2={0.175}
          y2={0.871}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#05556d" />
          <Stop offset={1} stopColor="#c534db" stopOpacity={0.78} />
        </LinearGradient>
      </Defs>
      <G
        data-name="Ellipse 32"
        stroke="#3498db"
        opacity={0.75}
        fill="url(#prefix__a)"
      >
        <Circle cx={162} cy={162} r={162} stroke="none" />
        <Circle cx={162} cy={162} r={161.5} fill="none" />
      </G>
    </Svg>
  )
}

export default BookiCircle4
