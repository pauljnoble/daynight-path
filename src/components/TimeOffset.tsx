import styled from "styled-components";
import { PX_DRAG_PER_DAY } from "../constants";
import { motion, MotionValue, useTransform } from "framer-motion";
import { resetAppTimeSelector, useStore } from "../store";
import { memo } from "react";
import TimeDifference from "./TimeDifference";

const WIDTH = PX_DRAG_PER_DAY;
const GAP_HOUR = PX_DRAG_PER_DAY / 24;
const GAP_TICK = GAP_HOUR / 6;
const HOURS = Array(24).fill("");
const TICKS = Array(6).fill("");
const HEIGHT = 32;
const HOUR_OFFSET_Y = 16;
const MINUTE_OFFSET_Y = 16;

const Hatches = memo(({ offsetDays }: { offsetDays: number }) => {
  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {HOURS.map((_, i) => {
        return (
          <>
            <rect
              x={GAP_HOUR * i - 0.5}
              y={0}
              width="1.5"
              height={HEIGHT - HOUR_OFFSET_Y}
              fill="var(--color-tick-hour-bg)"
            />
            <text
              x={GAP_HOUR * i}
              y={HEIGHT}
              fill={"var(--color-tick-hour-bg)"}
              fontSize={10}
              textAnchor={"middle"}
            >
              {(i - 12 + offsetDays * 24) % 24 ||
                `${
                  offsetDays === 0
                    ? "Now"
                    : `${offsetDays > 0 ? "+" : ""}${offsetDays} days`
                }`}
            </text>
            {TICKS.map((_, ii) => {
              if (!ii) return null;
              return (
                <rect
                  x={GAP_HOUR * i + GAP_TICK * ii}
                  y={0}
                  width="1"
                  height={HEIGHT - MINUTE_OFFSET_Y}
                  fill="var(--color-tick-min-bg)"
                />
              );
            })}
          </>
        );
      })}
    </svg>
  );
});

type Props = {
  x: MotionValue<number>;
};

const TimeOffset = ({ x }: Props) => {
  const transformedX = useTransform(x, (x) => x % PX_DRAG_PER_DAY);
  const resetAppTime = useStore(resetAppTimeSelector);
  const offsetDays = useStore((state) => state.offsetDays);
  const { appTime, realTime } = useStore();
  const isSynced = Math.abs(appTime - realTime) < 1000 * 60;

  const handleClick = () => {
    resetAppTime();
  };

  return (
    <Root data-active={!isSynced}>
      <TimeDiff onClick={handleClick}>
        <TimeDifference />
      </TimeDiff>
      <TickerMask>
        <Ticker style={{ x: transformedX }}>
          <Hatches offsetDays={offsetDays - 1} />
          <Hatches offsetDays={offsetDays} />
          <Hatches offsetDays={offsetDays + 1} />
        </Ticker>
      </TickerMask>
    </Root>
  );
};

const TickerMask = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  height: var(--ticker-height);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  mask: url(/side-gradient-mask.svg) repeat-y center;
  mask-size: 70% auto;
  mask-position: 50% 0;
`;

const Ticker = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: ${PX_DRAG_PER_DAY * 3}px;
  margin: auto;
  pointer-events: none;
  transition: opacity 250ms;

  &[data-active="false"] {
    opacity: 0;
  }

  /* padding-bottom: 8px; */

  svg {
    flex: 0 0 auto;
    overflow: visible;
  }
`;

const TimeDiff = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 12;
  display: flex;
  justify-content: center;
  transition: all 300ms;
  pointer-events: all;
  transform: translateY(0) scale(1);

  [data-active="false"] & {
    transition: none;
  }
`;

const Root = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 104px;
  pointer-events: none;
  background-image: linear-gradient(to top, var(--color-bg) 50%, transparent);
  z-index: 10;

  &[data-active="false"] {
    pointer-events: none;

    ${Ticker} {
      opacity: 1;
    }

    ${TimeDiff} {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

export default TimeOffset;
