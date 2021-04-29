import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabLine(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={2}
      height={43.5}
      viewBox="0 0 2 43.5"
      {...props}
    >
      <Path
        data-name="Line 41"
        fill="none"
        stroke="#ececec"
        strokeLinecap="round"
        strokeWidth={2}
        opacity={0.6}
        d="M1 1v41.5"
      />
    </Svg>
  )
}

export default TabLine
