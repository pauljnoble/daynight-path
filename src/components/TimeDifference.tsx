import { styled } from "styled-components";
import { useStore } from "../store";

const TimeDifference = () => {
  const { appTime, realTime } = useStore();
  const time = appTime - realTime;

  // Calculate the absolute value of the duration in milliseconds
  const absMs = Math.abs(time);
  const totalMinutes = Math.ceil(absMs / 60000);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  // Determine the sign
  const sign = time < 0 ? "–" : "+";

  // Format days, hours, and minutes with leading zeros if necessary
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return (
    <Control>
      <Root>
        <span className="sign">{sign}</span>
        {days ? (
          <span className="days">
            {days}
            <span className="unit">day{days > 1 ? "s" : ""}</span>
          </span>
        ) : null}
        <span className="hours">
          {days ? formattedHours : hours}
          <span className="unit">hr</span>
          {formattedMinutes}
          <span className="unit no-pad-right">min</span>
        </span>
      </Root>
      <CloseWrapper>
        <svg viewBox="0 0 24 24">
          <path
            d={
              "M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z"
            }
            fill="currentColor"
          />
        </svg>
      </CloseWrapper>
    </Control>
  );
};

const Control = styled.div`
  position: relative;
  height: 32px;
  padding: 0 40px 0 20px;
  border-radius: 16px;
  outline: 1px solid var(--color-bg);
  color: white;
  background-color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  pointer-events: all;
  cursor: default;

  .triangle {
    color: var(--color-accent);
    position: absolute;
    bottom: 100%;
    height: 6px;
    width: 14px;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
  }
`;

const CloseWrapper = styled.div`
  width: 26px;
  height: 26px;
  justify-content: center;
  display: inline-flex;
  border-radius: 50%;
  position: absolute;
  right: 4px;
  top: 0;
  bottom: 0;
  margin: auto;
  align-items: center;
  cursor: pointer;

  svg {
    width: 16px;
    opacity: 0.5;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const Root = styled.div`
  --opacity-faint: 0.66;
  --font-size-small: 14px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-variant-numeric: tabular-nums;

  .sign {
    padding-right: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 300;
    width: 1em;
    justify-content: center;
    /* opacity: var(--opacity-faint); */
  }

  .separator {
    /* opacity: var(--opacity-faint); */
    display: inline-block;
    padding: 0 1px;
  }

  .unit {
    /* text-transform: uppercase; */
    font-size: var(--font-size-small);
    padding-left: 2px;
    padding-right: 6px;
    font-weight: 500;
    /* opacity: var(--opacity-faint); */

    &.no-pad-right {
      padding-right: 0;
    }
  }
`;

export default TimeDifference;
