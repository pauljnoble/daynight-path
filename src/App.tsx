import styled from "styled-components";
import {
  CYLINDRICAL_STEREOGRAPHIC_ASPECT,
  CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED,
} from "./constants";
import Cover from "./components/Cover";
import Map from "./components/Map";
import Locations from "./components/Locations";
import DayNight from "./components/DayNight";
import Dragger from "./components/Dragger";
import Markers from "./components/Markers";
import { useMotionValue } from "framer-motion";
/* @ts-ignore */
import FPSStats from "react-fps-stats";
import DateSelector from "./components/DateSelector";
import { dayToMs, getIsNorthSun } from "./utils";
import { offsetDaysSelector, useStore } from "./store";

const App = () => {
  const offsetDays = useStore(offsetDaysSelector);
  const isNorthSun = getIsNorthSun(dayToMs(offsetDays) + Date.now());
  const dragX = useMotionValue(0);

  return (
    <Root data-is-north-sun={isNorthSun}>
      <FPSStats />
      <VideoFrame />

      <Main>
        {/* <div>{new Date(appTime).toTimeString()}</div> */}
        <LocationsSection>
          <Locations />
        </LocationsSection>
        <MapCrop>
          <MapContainer>
            <Dragger x={dragX} />
            <DayNight x={dragX} />
            <Markers />
            <Cover />
            <Map />
          </MapContainer>
        </MapCrop>
        <DateSection>
          <DateSelector />
        </DateSection>
      </Main>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  min-width: calc(var(--width) + 100px);
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
`;

const VideoFrame = styled.div`
  box-sizing: border-box;
  width: 1024px;
  height: 768px;
  position: fixed;
  padding: 36px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  outline: dotted 1px var(--color-debug-outline);

  &::before {
    display: block;
    width: 100%;
    height: 100%;
    outline: dotted 1px var(--color-debug-outline);

    content: "";
  }
`;

const Main = styled.div`
  flex-basis: var(--width);

  /* > * {
    outline: dashed 1px black;
  } */
`;

const MapCrop = styled.div`
  position: relative;
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED};
`;

const LocationsSection = styled.div`
  height: 120px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 16px;
`;

const DateSection = styled.div`
  /* background-color: red; */
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT};
  overflow: visible;
`;

export default App;
