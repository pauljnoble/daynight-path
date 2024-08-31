import { useRef, ChangeEvent } from "react";
import styled from "styled-components";

interface RangeSliderProps {
  renderValue(value: number): string;
  min: number;
  max: number;
  val: number;
  step?: number;
  hideValues?: boolean;
  onChange: Function;
}

const RangeSlider = ({
  renderValue,
  min,
  step,
  max,
  val,
  hideValues,
  onChange,
}: RangeSliderProps) => {
  const valRef = useRef<HTMLInputElement>(null);

  const renderVal = () =>
    typeof renderValue === "function" ? renderValue(val) : "";
  const range = max - min;

  return (
    <Root>
      <Control
        type="range"
        min={min}
        max={max}
        value={val}
        step={step ?? 0.1}
        ref={valRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, max);
          onChange(value);
          event.target.value = value.toString();
        }}
      />

      <Slider>
        <SliderTrackHighlight
          style={{ width: `${((val - min) / range) * 100}%` }}
        />
        <SliderTrack />
        <SliderCurrValue>{renderVal()}</SliderCurrValue>
        {!hideValues && <SliderLeftValue>{min}</SliderLeftValue>}
        {!hideValues && <SliderRightValue>{max}</SliderRightValue>}
      </Slider>
    </Root>
  );
};

export const Slider = styled.div`
  --slider-track-height: 3px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const SliderTrack = styled.div`
  position: absolute;
  height: var(--slider-track-height);
  border-radius: calc(var(--slider-track-height) / 2);
  background-color: var(--color-slider-track);
  width: 100%;
  z-index: 1;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const SliderRange = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 2px;
  z-index: 2;
`;

export const SliderValue = styled.div`
  position: absolute;
  color: var(--color-text-secondary);
  font-size: 11px;
  margin-top: 12px;
  font-variant-numeric: tabular-nums;
  bottom: 0;
`;

export const SliderLeftValue = styled(SliderValue)`
  left: 0;
`;

export const SliderCurrValue = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 11px;
  margin: auto;
  text-align: center;
  pointer-events: none;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
`;

export const SliderRightValue = styled(SliderValue)`
  right: 0;
  left: auto;
`;

export const SliderTrackHighlight = styled.div`
  position: absolute;
  height: var(--slider-track-height);
  border-radius: 2px 0 0 2px;
  background-color: var(--color-slider-accent);
  top: 0;
  z-index: 2;
  left: 0;
  bottom: 0;
  margin: auto;
`;

export const Control = styled.input.attrs({ type: "range" })`
  -webkit-tap-highlight-color: transparent;
  /* pointer-events: none; */
  position: absolute;
  height: var(--slider-track-height);
  width: 100%;
  bottom: 0;
  top: 0;
  margin: auto;
  outline: none;
  appearance: none;
  background-color: transparent;

  &::-webkit-slider-thumb {
    appearance: none;
    /* background-color: var(--grey-800); */
    background-color: var(--color-slider-thumb);
    border: 1px solid var(--color-slider-thumb);
    border-radius: 50%;
    /* border-radius: 2px; */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    height: 12px;
    width: 12px;
    margin-top: 0;
    pointer-events: all;
    position: relative;
    z-index: 3;
  }
`;

export const Root = styled.div`
  --slider-track-height: 2px;
  --component-min-height: 44px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  min-height: var(--component-min-height);
  transition: opacity 400ms;
`;

export default RangeSlider;
