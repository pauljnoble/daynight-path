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
      <Container>
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
      </Container>
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
  color: var(--color-text-primary);
  background-image: linear-gradient(
    to bottom,
    var(--color-gradient-start),
    var(--color-gradient-end)
  );
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: var(--width);
  height: var(--height);
  overflow: hidden;
  background-color: var(--color-bg);
  outline: dotted 1px var(--color-debug-outline);
  border-radius: 20px;
  outline: 1px solid var(--color-container-outline);
`;

const Main = styled.div`
  flex-basis: var(--width-map);
  outline: dotted 1px var(--color-debug-outline);
`;

const MapCrop = styled.div`
  position: relative;
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED};
`;

const LocationsSection = styled.div`
  height: 132px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
  position: relative;
  z-index: 5;
`;

const DateSection = styled.div`
  padding-top: 12px;
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
