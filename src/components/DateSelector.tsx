import styled from "styled-components";
import { useStore } from "../store";
import { formatDate, getDayNumberOfYear } from "../utils";
import RangeSlider from "./Range";
import { MS_PER_DAY } from "../constants";

const DateSelector = () => {
  const { appTime, setAppTime, realTime } = useStore();

  const handleChange = (value: number) => {
    // Create a new Date object for January 1st of the given year
    const currentYear = new Date().getUTCFullYear();
    const date = new Date(Date.UTC(currentYear, 0, 1));

    // Set the date to the nth day of the year
    date.setUTCDate(value);

    // Maintain the current time of day
    date.setUTCMilliseconds(realTime % MS_PER_DAY);

    setAppTime(date.getTime());
  };

  return (
    <Root>
      <DateLabel>
        {formatDate(new Date(appTime))} <span>UTC</span>
      </DateLabel>

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
  pointer-events: none;
  color: var(--color-text-primary);
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  transition: all 400ms;

  span {
    color: var(--color-text-secondary);
    font-size: 14px;
  }
`;

const Root = styled.div`
  position: relative;
  margin: auto;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  transition: opacity 400ms;
  border-radius: 8px;
`;

export default DateSelector;
