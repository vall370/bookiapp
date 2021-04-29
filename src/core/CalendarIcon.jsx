import React from "react";
import Svg, { G, Rect, Line } from "react-native-svg";

const CalendarIcon = (props) => (
  <Svg width={24} height={26} viewBox="0 0 24 26" {...props}>
    <G id="calendar2" transform="translate(-1.518 -0.687)">
      <Rect
        id="Rectangle_371"
        data-name="Rectangle 371"
        width={22}
        height={21}
        rx={2}
        transform="translate(2.518 4.687)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Line
        id="Line_43"
        data-name="Line 43"
        y2={5}
        transform="translate(18.518 1.687)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Line
        id="Line_44"
        data-name="Line 44"
        y2={5}
        transform="translate(8.518 1.687)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Line
        id="Line_45"
        data-name="Line 45"
        x2={22}
        transform="translate(2.518 11.687)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </G>
  </Svg>
);

export default CalendarIcon;
