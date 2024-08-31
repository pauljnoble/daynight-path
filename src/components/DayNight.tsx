import { useMemo } from "react";
import { geoCylindricalStereographic } from "d3-geo-projection";
import { CYLINDRICAL_STEREOGRAPHIC_ASPECT, MS_PER_DAY } from "../constants";
import {
  getAllAngles,
  getCoordPathsFromRanges,
  getPointGroups,
  getPathStrings,
  dayToMs,
  pathsToSvgString,
  pxToMs,
} from "../utils";
import styled from "styled-components";
import { useStore } from "../store";
import { motion, useTransform } from "framer-motion";

const DayNight = ({ x }: any) => {
  const { realTime, offsetDays, theme } = useStore();
  // const offset = appTime - realTime;

  const longitudePrecision = 3;

  // Get the derived days offset
  // const offsetDays = msToDay(offset);

  const getPaths = (time: number) => {
    const ranges = getAllAngles(new Date(time), 0, longitudePrecision);
    const paths = getCoordPathsFromRanges(ranges, longitudePrecision);
    const width = 100;
    const height = 100 / CYLINDRICAL_STEREOGRAPHIC_ASPECT;

    const projection = geoCylindricalStereographic()
      .scale(width / (2 * Math.PI))
      .translate([width / 2, height / 2]);

    const pointGroup = getPointGroups(paths, projection);
    return getPathStrings(pointGroup, width, height);
  };

  /**
   * Expensive, so only update on mount or when daysOffset / options changes.
   * Only render for 0:00 value.
   */
  const paths = useMemo(() => {
    console.log("Expensively rendering day / night path.", offsetDays);
    const time = realTime + dayToMs(offsetDays);
    return getPaths(time);
  }, [offsetDays, realTime, longitudePrecision, theme]);

  // const baseEncoded = useMemo(() => {
  //   console.log("Expensively getting base encoded image");
  //   const str = pathsToSvgString(paths);
  //   return convertSvgToCssBackgroundImage(str);
  // }, [paths]);

  const svgString = useMemo(() => {
    if (!paths) return "";

    return pathsToSvgString(paths);
  }, [paths]);

  // const dayOffset = -(((offset / MS_PER_DAY) * 100) / 3) % (100 / 3);

  const xTransformed = useTransform(
    () => `${(((pxToMs(x.get()) / MS_PER_DAY) * 100) / 3) % (100 / 3)}%`
  );

  return (
    <>
      <Root>
        <Paths>
          <DayNightShadow
            style={{
              x: xTransformed,
            }}
          >
            {svgString && (
              <DayNightShadowBg>
                <div
                  className="svg"
                  style={{ left: 0 }}
                  dangerouslySetInnerHTML={{ __html: svgString }}
                ></div>
                <div
                  className="svg"
                  style={{ left: "20%" }}
                  dangerouslySetInnerHTML={{ __html: svgString }}
                ></div>
                <div
                  className="svg"
                  style={{ left: "40%" }}
                  dangerouslySetInnerHTML={{ __html: svgString }}
                ></div>
                <div
                  className="svg"
                  style={{ left: "60%" }}
                  dangerouslySetInnerHTML={{ __html: svgString }}
                ></div>
                <div
                  className="svg"
                  style={{ left: "80%" }}
                  dangerouslySetInnerHTML={{ __html: svgString }}
                ></div>
              </DayNightShadowBg>
            )}
          </DayNightShadow>
        </Paths>
      </Root>
    </>
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

const DayNightShadow = styled(motion.div)`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100%;
  overflow: visible;
  font-size: 120px;
`;

const DayNightShadowBg = styled.div`
  position: absolute;
  /* 
  Leave an overhang for the background repeat, see below.
  ------
   xxx   <- parent 
  xxxxx  <- this element
  ------
  Width must accommodate the overhang.
  */
  left: calc(1 / 3 * -100%);
  width: calc(5 / 3 * 100%);
  height: 100%;
  /* background-repeat: repeat-x; */
  /* background-size: auto 100%; */
  display: flex;

  > .svg {
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: calc(1 / 5 * 100%);

    > svg {
      width: calc(100% + 2px);
      height: 100%;
      margin-left: -1px;
    }
  }
`;

export default DayNight;
