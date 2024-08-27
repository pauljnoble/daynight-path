import { useDrag } from "@use-gesture/react";
import { useRef } from "react";
import { styled } from "styled-components";
import { useStore } from "../store";
import { pxToMs } from "../utils";

const Dragger = ({ x }: any) => {
  const { setAppTime, realTime, appTime } = useStore();
  const isDownRef = useRef(false);
  const dragTimeRef = useRef(realTime);
  const lastMx = useRef(0);

  const onDrag = (value: number) => {
    const dragPx = value + lastMx.current;
    const offsetMs = pxToMs(-dragPx);
    setAppTime(dragTimeRef.current + offsetMs);
    x.set(dragPx);
  };

  const handleDrag = (state: any) => {
    const {
      down,
      movement: [mx],
    } = state;

    const wasDown = isDownRef.current;

    if (!wasDown && down) {
      dragTimeRef.current = appTime;
    }

    // Update the ref immediately with the current `down` state
    isDownRef.current = down;

    if (down) {
      // During the drag, calculate the drag movement
      onDrag(mx);
    } else {
      // When drag ends, accumulate the movement
      lastMx.current += mx;
    }
  };

  const bind = useDrag(handleDrag, {
    filterTaps: true,
    // this can solve the bug of the handler occassionally not registering the !down event
    // however we can also use the workaround below on the element (onMouseUp)
    // pointer: { capture: false },
  });

  return <Root {...bind()}></Root>;
};

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

export default Dragger;
