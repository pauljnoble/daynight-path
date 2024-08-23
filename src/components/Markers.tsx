import styled from "styled-components";
import { geoCylindricalStereographic } from "../utils";

const Marker = ({ item }: any) => {
  const xy = geoCylindricalStereographic(item.location);
  return <MarkerRoot style={{ left: `${xy.x}%`, top: `${xy.y}%` }} />;
};

const Markers = ({ items }: any) => {
  return (
    <Root>
      {items.map((item: any) => (
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
  background-color: black;
  border: 1px solid white;
  border-radius: 50%;
  z-index: 9;
  transform: translateX(-50%) translateY(-50%);
`;

export default Markers;
