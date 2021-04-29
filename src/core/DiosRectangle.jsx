import React from "react";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const DiosRectangle = (props) => (
  <Svg width={'100%'} height={'100%'}  {...props}>
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1={-0.172}
        y1={-0.177}
        x2={0.713}
        y2={0.462}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#05526d" stopOpacity={0.659} />
        <Stop offset={1} stopColor="#05526d" />
      </LinearGradient>
    </Defs>
    <Rect
      id="Rectangle_112"
      data-name="Rectangle 112"
      width={'100%'}
      height={812}
      fill="url(#linear-gradient)"
    />
  </Svg>
);

export default DiosRectangle;
