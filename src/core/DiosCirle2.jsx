import * as React from "react"
import Svg, { Circle } from "react-native-svg"
import { normalize } from "./size"

function DiosCircle2(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={ normalize(77)}
      height={ normalize(77)}
      viewBox="0 0 77 77"
      {...props}
    >
      <Circle
        data-name="Ellipse 34"
        cx={38.5}
        cy={38.5}
        r={38.5}
        fill="#f16771"
      />
    </Svg>
  )
}

export default DiosCircle2
