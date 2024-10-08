import styled from "styled-components";
import { geoCylindricalStereographic } from "../utils";
import { LOCATIONS } from "../constants";

const Marker = ({ item }: any) => {
  const xy = geoCylindricalStereographic(item.coords);
  return <MarkerRoot style={{ left: `${xy.x}%`, top: `${xy.y}%` }} />;
};

const Markers = () => {
  return (
    <Root>
      {LOCATIONS.map((item: any) => (
        <Marker item={item} key={item.id} />
      ))}
    </Root>
  );
};

export const Root = styled.div``;

const MarkerRoot = styled.div`
  position: absolute;
  height: var(--marker-size);
  width: var(--marker-size);
  background-color: var(--color-marker-bg);
  border: 1px solid var(--color-marker-border);
  border-radius: 50%;
  z-index: 9;
  transform: translateX(-50%) translateY(-50%);
`;

export default Markers;
