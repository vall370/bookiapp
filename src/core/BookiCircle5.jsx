import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg"

function BookiCircle5(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={119.588}
      height={119.588}
      viewBox="0 0 119.588 119.588"
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
          <Stop offset={1} stopColor="#3498db" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Ellipse 30"
        cx={51}
        cy={51}
        r={51}
        transform="rotate(-79 60.731 50.063)"
        opacity={0.75}
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default BookiCircle5
