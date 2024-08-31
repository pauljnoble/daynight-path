import { styled } from "styled-components";
import { useStore } from "../store";
import Icon from "./Icon";

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
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");

  if (formattedHours === "00" && formattedMinutes === "00") {
    formattedHours = "";
    formattedMinutes = "";
  }

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
          {formattedHours && <span className="unit">hr</span>}
          {formattedMinutes}
          {formattedMinutes && <span className="unit no-pad-right">min</span>}
        </span>
      </Root>
      <CloseWrapper>
        <Icon type="close" />
      </CloseWrapper>
      <span className="triangle" />
    </Control>
  );
};

const Control = styled.div`
  position: relative;
  height: 36px;
  padding: 0 40px 0 20px;
  border-radius: 18px;
  outline: 1px solid var(--color-bg);
  color: white;
  background-color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: default;
  overflow: visible;

  .triangle {
    display: block;
    background-color: var(--color-accent);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
    width: 14px;
    height: 8px;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    z-index: 1;
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
  --font-size-small: 16px;
  --font-size-default: 18px;

  font-size: var(--font-size-default);
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;

  .sign {
    padding-right: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 400;
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
    font-weight: 600;
    /* opacity: var(--opacity-faint); */

    &.no-pad-right {
      padding-right: 0;
    }
  }
`;

export default TimeDifference;
