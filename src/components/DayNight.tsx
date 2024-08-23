import { useMemo } from "react";
import { geoCylindricalStereographic } from "d3-geo-projection";
import { CYLINDRICAL_STEREOGRAPHIC_ASPECT } from "../constants";
import {
  getAllAngles,
  getCoordPathsFromRanges,
  getPointGroups,
  getPathStrings,
} from "../utils";
import styled from "styled-components";

type Props = {
  date: number;
  offset: number;
  options?: {
    longitudePrecision: number;
  };
};

const DayNight = ({ date, offset, options }: Props) => {
  const longitudePrecision = options?.longitudePrecision || 3;

  const paths = useMemo(() => {
    const ranges = getAllAngles(new Date(date), 0, longitudePrecision);
    const paths = getCoordPathsFromRanges(ranges, longitudePrecision);
    const width = 100;
    const height = 100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT;

    const projection = geoCylindricalStereographic()
      .scale(width / (2 * Math.PI))
      .translate([width / 2, height / 2]);

    const pointGroup = getPointGroups(paths, projection);
    return getPathStrings(pointGroup, width, height);
  }, [date, longitudePrecision]);

  return (
    <Root>
      <Paths>
        <DayNightShadow style={{ transform: `translateX(${offset}px)` }}>
          <svg viewBox={`0 0 100 ${100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT}`}>
            <path d={paths.closedPath} />
            <path d={paths.curvePath} className="open" />
          </svg>
          <svg viewBox={`0 0 100 ${100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT}`}>
            <path d={paths.closedPath} />
            <path d={paths.curvePath} className="open" />
          </svg>
          <svg viewBox={`0 0 100 ${100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT}`}>
            <path d={paths.closedPath} />
            <path d={paths.curvePath} className="open" />
          </svg>
        </DayNightShadow>
      </Paths>
    </Root>
  );
};

const Root = styled.div`
  aspect-ratio: ${CYLINDRICAL_STEREOGRAPHIC_ASPECT * 3};
  position: absolute;
  z-index: 1;
  width: 300%;
  left: -100%;
  display: flex;

  > *::before {
    content: "";
    position: absolute;
    display: block;
    width: 300%;
    bottom: 100%;
    height: var(--fade-size);
    background-color: var(--color-fill-daynight);
    opacity: var(--opacity-fill-daynight);
    left: -100%;
  }

  [data-is-north-sun="true"] & {
    ::before {
      bottom: auto;
      top: 100%;
    }
  }
`;

const Paths = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const DayNightShadow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100%;

  > svg {
    width: calc(33.3333% + 1px);
    height: 100%;
    left: 10px;
    position: relative;

    path {
      fill: var(--color-fill-daynight);
      fill-opacity: var(--opacity-fill-daynight);
    }

    path.open {
      fill: transparent;
      stroke: var(--color-stroke-daynight);
      stroke-width: 0.1;
      stroke-opacity: var(--opacity-stroke-daynight);
    }
  }
`;

export default DayNight;
