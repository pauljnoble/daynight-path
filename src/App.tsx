import styled, { css } from "styled-components";
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
import DateSelector from "./components/DateSelector";
import { dayToMs, getIsNorthSun } from "./utils";
import { offsetDaysSelector, setThemeSelector, useStore } from "./store";
import TimeOffset from "./components/TimeOffset";
import { useState } from "react";
import Icon from "./components/Icon";
import { Theme } from "./types";

const themes: Theme[] = ["purple", "green", "mono-dark"];

const App = () => {
  const setTheme = useStore(setThemeSelector);
  const offsetDays = useStore(offsetDaysSelector);
  const isNorthSun = getIsNorthSun(dayToMs(offsetDays) + Date.now());
  const dragX = useMotionValue(0);

  const [isDateSelectorActive, setDateSelectorActive] = useState(false);

  const handleClickTheme = () => {
    const el = document.documentElement;
    const currTheme = el.getAttribute("data-theme")! as Theme;
    const currIndex = themes.indexOf(currTheme);
    const next = themes[(currIndex + 1) % themes.length];
    el.setAttribute("data-theme", next);
    setTheme(next as Theme);
  };

  const handleClickClose = () => {
    setDateSelectorActive(false);
  };

  const handleClickCalendar = () => {
    setDateSelectorActive(!isDateSelectorActive);
  };

  return (
    <Root data-is-north-sun={isNorthSun}>
      <Container>
        <Main>
          <ThemeBtn onClick={handleClickTheme}>
            <Icon type="contrast" />
          </ThemeBtn>
          <CalendarBtn onClick={handleClickCalendar}>
            <Icon type="calendar" />
          </CalendarBtn>

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
          {isDateSelectorActive && (
            <DateSection>
              <CloseBtn onClick={handleClickClose}>
                <Icon type="close" />
              </CloseBtn>
              <DateSelector />
            </DateSection>
          )}
          <TimeOffset x={dragX} />
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
  align-items: flex-start;
  justify-content: center;
  position: relative;
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

  * {
    user-select: none;
  }
`;

const MapCrop = styled.div`
  position: relative;
  top: 20px;
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT_CROPPED};
`;

const btnStyles = css`
  appearance: none;
  border: 0;
  padding: 0;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: inherit;
  }

  &:focus {
    outline: none;
  }
`;

const CloseBtn = styled.button`
  ${btnStyles}
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 1;
  background-color: transparent;

  svg {
    width: 18px;
    color: var(--color-text-secondary);
  }
`;

const ThemeBtn = styled.button`
  ${btnStyles}
  position: absolute;
  top: 12px;
  right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--color-btn);
  border: 1px solid var(--color-btn-outline);
  z-index: 12;

  svg {
    width: 14px;
  }
`;

const CalendarBtn = styled.button`
  ${btnStyles}
  position: absolute;
  top: 12px;
  right: 52px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--color-btn);
  border: 1px solid var(--color-btn-outline);
  z-index: 12;

  svg {
    width: 14px;
  }
`;

const LocationsSection = styled.div`
  height: 148px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 12px;
  position: relative;
  z-index: 5;
`;

const DateSection = styled.div`
  position: absolute;
  top: 60px;
  right: 24px;
  background-color: var(--color-bg);
  z-index: 12;
  padding: 16px 20px 4px;
  border-radius: 8px;
  outline: 1px solid var(--color-popup-outline);
  box-shadow: var(--shadow-popup);
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
