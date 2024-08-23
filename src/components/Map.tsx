import styled from "styled-components";
import { CYLINDRICAL_STEREOGRAPHIC_ASPECT } from "../constants";

const Map = () => {
  return (
    <Root>
      <MaskedImage />
    </Root>
  );
};

export const Root = styled.div`
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT};
  width: 100%;
  position: absolute;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export const MaskedImage = styled.div`
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT};
  width: 100%;
  position: relative;
  background-color: var(--color-map);
  mask: url(/map.svg) repeat-x center;
  mask-position: calc(var(--width) * -0.033333) 0;
  right: calc(var(--width) * -0.033333);
  mask-size: 100% auto;
`;

export default Map;
