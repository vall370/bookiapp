import React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

const SVGComponent = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
    <G id="Group_44" data-name="Group 44" transform="translate(-71 -730)">
      <G id="Layer_2" data-name="Layer 2" transform="translate(71 730)">
        <G id="folder-remove">
          <Rect
            id="Rectangle_284"
            data-name="Rectangle 284"
            width={30}
            height={30}
            fill="#fff"
            opacity={0}
          />
          <Path
            id="Path_842"
            data-name="Path 842"
            d="M15.25,13h-5a1.25,1.25,0,0,0,0,2.5h5a1.25,1.25,0,0,0,0-2.5Z"
            transform="translate(2.25 3.25)"
            fill="#fff"
          />
          <Path
            id="Path_843"
            data-name="Path 843"
            d="M23.875,7.938h-8.75L11.837,3.963a1.25,1.25,0,0,0-.962-.462H5.125A3.087,3.087,0,0,0,2,6.538V21.713A3.088,3.088,0,0,0,5.125,24.75h18.75A3.087,3.087,0,0,0,27,21.713V10.975A3.088,3.088,0,0,0,23.875,7.938Zm.625,13.75a.575.575,0,0,1-.625.537H5.125a.575.575,0,0,1-.625-.537V6.538A.575.575,0,0,1,5.125,6h5.163l3.25,3.975a1.25,1.25,0,0,0,.963.462h9.375a.575.575,0,0,1,.625.538Z"
            transform="translate(0.5 0.875)"
            fill="#fff"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SVGComponent;
