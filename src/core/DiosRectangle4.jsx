import React from "react";
import Svg, { Defs, G, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const DiosRectangle4 = (props) => (
  <Svg width={259} height={78} viewBox="0 0 259 78" {...props}>
    <Defs></Defs>
    <G transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_388)">
      <Rect
        id="Rectangle_388-2"
        data-name="Rectangle 388"
        width={241}
        height={60}
        transform="translate(9 6)"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default DiosRectangle4;