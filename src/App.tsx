import { useState } from "react";
import styled from "styled-components";
import {
  CYLINDRICAL_STEREOGRAPHIC_ASPECT,
  CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED,
  LOCATIONS,
  MS_DAY,
} from "./constants";
import Cover from "./components/Cover";
import Map from "./components/Map";
import DayNight from "./components/DayNight";
import Markers from "./components/Markers";

const now = Date.now();

const App = () => {
  /**
   * Simple state consisting of the current system time and the app time
   * defined by the user.
   */
  const [time, setTime] = useState({ real: now, app: now });
  const offset = time.app - time.real;
  const offsetDays = Math.floor(offset / MS_DAY);

  return (
    <Root>
      <Main>
        <Locations></Locations>
        <MapCrop>
          <MapContainer>
            <Markers items={LOCATIONS} />
            <Cover />
            <DayNight date={time.app} offset={offset} />
            <Map />
          </MapContainer>
        </MapCrop>
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
`;

const Main = styled.div`
  flex-basis: var(--width);
  outline: 1px solid red;
`;

const Locations = styled.div`
  height: 100px;
  outline: solid 1px red;
`;

const MapCrop = styled.div`
  position: relative;
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED};
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
