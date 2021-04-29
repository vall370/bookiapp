import React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

const ProfileIcon = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
    <G id="Group_42" data-name="Group 42" transform="translate(-189 -727)">
      <G
        id="Layer_2"
        data-name="Layer 2"
        transform="translate(189.054 727.054)"
      >
        <G id="person" transform="translate(0.347 0.347)">
          <Rect
            id="Rectangle_285"
            data-name="Rectangle 285"
            width={30}
            height={30}
            transform="translate(-0.401 -0.401)"
            fill="#fff"
            opacity={0}
          />
          <Path
            id="Path_844"
            data-name="Path 844"
            d="M13.054,13.108A5.054,5.054,0,1,0,8,8.054,5.054,5.054,0,0,0,13.054,13.108Zm0-7.581a2.527,2.527,0,1,1-2.527,2.527A2.527,2.527,0,0,1,13.054,5.527Z"
            transform="translate(1.545 0.227)"
            fill="#fff"
          />
          <Path
            id="Path_845"
            data-name="Path 845"
            d="M13.845,13A8.845,8.845,0,0,0,5,21.845a1.264,1.264,0,0,0,2.527,0,6.318,6.318,0,0,1,12.635,0,1.264,1.264,0,0,0,2.527,0A8.845,8.845,0,0,0,13.845,13Z"
            transform="translate(0.754 2.862)"
            fill="#fff"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default ProfileIcon;
