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
      <DateLabel>{formatDate(new Date(appTime))}</DateLabel>

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
