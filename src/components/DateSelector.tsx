import styled from "styled-components";
import { useStore } from "../store";
import { formatDate, getDayNumberOfYear } from "../utils";
import RangeSlider from "./Range";

const DateSelector = () => {
  const { appTime, setAppTime, msSinceStartOfDay } = useStore();

  const handleChange = (value: number) => {
    // Create a new Date object for January 1st of the given year
    const date = new Date(Date.UTC(2024, 0, 1));

    // Set the date to the nth day of the year
    date.setUTCDate(value);

    // Maintain the current time of day
    date.setUTCMilliseconds(msSinceStartOfDay);

    setAppTime(date.getTime());
  };

  return (
    <Root>
      <DateLabel>{formatDate(new Date(appTime))} </DateLabel>

      <RangeSlider
        min={1}
        max={365}
        step={1}
        renderValue={() => ""}
        hideValues
        val={getDayNumberOfYear(appTime)}
        onChange={handleChange}
      />
    </Root>
  );
};

const DateLabel = styled.div`
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  pointer-events: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  z-index: 9;
  font-variant-numeric: tabular-nums;
  opacity: 1;
  transition: all 400ms;
  text-transform: uppercase;
  transform: translateY(24px);
`;

const Root = styled.div`
  position: relative;
  margin: auto;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9;
  transition: opacity 400ms;

  ${DateLabel} + * {
    opacity: 0;
  }

  &:hover {
    opacity: 1;

    ${DateLabel} {
      transform: translateY(0);
    }

    ${DateLabel} + * {
      opacity: 1;
    }
  }
`;

export default DateSelector;
