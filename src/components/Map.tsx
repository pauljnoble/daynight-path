import { useMemo } from "react";
import styled from "styled-components";
import { CYLINDRICAL_STEREOGRAPHIC_ASPECT } from "../constants";
import DynamicSvgImage from "./MapImage";
import { getCustomProperty } from "../utils";

const Map = () => {
  console.log("map");

  const fillColor = useMemo(() => {
    return getCustomProperty("--color-map");
  }, []);

  return (
    <Root>
      <DynamicSvgImage fillColor={fillColor} svgPath={"/map.svg"} />
      <DynamicSvgImage fillColor={fillColor} svgPath={"/map.svg"} />
    </Root>
  );
};

export const Root = styled.div`
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT};
  width: 100%;
  position: absolute;
  overflow: hidden;
  left: 3%;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  img:nth-child(1) {
    left: -3%;
  }

  img:nth-child(2) {
    left: 97%;
  }
`;

export const MaskedImage = styled.div`
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT};
  width: 100%;
  position: relative;
  background-color: var(--color-map);
  mask: url(/map.svg) repeat-x center;
  mask-position: calc(var(--width-map) * -0.033333) 0;
  right: calc(var(--width-map) * -0.033333);
  mask-size: 100% auto;
`;

export default Map;
