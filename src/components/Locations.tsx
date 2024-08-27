import { useMemo } from "react";
import { TODO } from "../types";
import { LOCATIONS } from "../constants";
import styled from "styled-components";
import { useStore } from "../store";

const getOptions = (timeZone: string): Intl.DateTimeFormatOptions => ({
  timeZone: timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const locations = LOCATIONS;

const Locations = () => {
  const { appTime } = useStore();

  const formatters = useMemo(() => {
    return locations.map((l: TODO) => {
      return new Intl.DateTimeFormat("en-US", getOptions(l.timeZone));
    });
  }, [locations]);

  return (
    <>
      {locations.map((l: TODO, i: number) => {
        const parts = formatters[i].format(appTime).split(":");

        const isLate = parseInt(parts[0]) < 7 || parseInt(parts[0]) > 19;

        return (
          <Root key={l.id}>
            <Time $isLate={isLate}>
              {parts[0]}
              <span>:</span>
              {parts[1]}
            </Time>
            <Name>{l.name}</Name>
          </Root>
        );
      })}
    </>
  );
};

const Root = styled.div`
  text-align: center;
  flex: 1;
`;

const Time = styled.div<{ $isLate: boolean }>`
  font-size: 52px;
  font-weight: 200;
  font-variant-numeric: tabular-nums;
  transition: color 300ms;

  ${(p) => p.$isLate && "color: var(--color-text-secondary);"}

  span {
    color: var(--color-text-secondary);
    opacity: 0.66;
  }
  /* filter: blur(3px); */
`;

const Name = styled.div`
  color: var(--color-text-secondary);
  text-transform: uppercase;
  font-size: 18px;
  padding-top: 12px;
  font-weight: 400;
  letter-spacing: 1px;
`;

export default Locations;
