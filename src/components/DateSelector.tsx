import styled from "styled-components";
import { useStore } from "../store";
import { formatDate, getDayNumberOfYear } from "../utils";
import RangeSlider from "./Range";

const DateSelector = () => {
  const { appTime, setAppTime } = useStore();

  const handleChange = (value: number) => {
    // Create a new Date object for January 1st of the given year
    const firstDayOfYear = new Date(Date.UTC(2024, 0, 1));

    // Set the date to the nth day of the year
    firstDayOfYear.setUTCDate(value);

    setAppTime(firstDayOfYear.getTime());
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
  font-size: 32px;
  font-weight: 400;
  z-index: 9;
  font-variant-numeric: tabular-nums;
  opacity: 1;
  transition: opacity 400ms;
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
  /* opacity: 0; */
  transition: opacity 400ms;

  &:hover {
    opacity: 1;

    ${DateLabel} {
      opacity: 1;
    }
  }
`;

export default DateSelector;
