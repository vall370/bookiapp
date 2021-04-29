import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg"

function BookiCircle2(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={261.469}
      height={261.469}
      viewBox="0 0 261.469 261.469"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.393}
          x2={0.71}
          y2={0.949}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#f6a731" />
          <Stop offset={1} stopColor="#8234db" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Ellipse 29"
        cx={102}
        cy={102}
        r={102}
        transform="rotate(160 113.834 118.9)"
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default BookiCircle2
