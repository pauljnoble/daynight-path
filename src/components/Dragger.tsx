import { useDrag } from "@use-gesture/react";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useStore } from "../store";
import { msToPx, pxToMs } from "../utils";

const Dragger = ({ x }: any) => {
  const { setAppTime, realTime, appTime } = useStore();
  const isDownRef = useRef(false);
  const lastDragX = useRef(0);

  const onDrag = (value: number) => {
    const dragPx = value + lastDragX.current;
    const offsetMs = pxToMs(-dragPx);
    setAppTime(realTime + offsetMs);
    // x.set(dragPx);
  };

  const handleDrag = (state: any) => {
    const {
      down,
      movement: [mx],
    } = state;

    const wasDown = isDownRef.current;

    // Store the x position on down
    if (down && !wasDown) {
      isDownRef.current = true;
      lastDragX.current = x.get();
    }

    if (down) {
      onDrag(mx);
    }

    if (!down) {
      isDownRef.current = false;
    }
  };

  const bind = useDrag(handleDrag, {
    filterTaps: true,
    // this can solve the bug of the handler occassionally not registering the !down event
    // however we can also use the workaround below on the element (onMouseUp)
    // pointer: { capture: false },
  });

  /**
   * When appTime gets updated, set the motion value to reflect the store value
   */
  useEffect(() => {
    x.set(msToPx(realTime - appTime));
  }, [appTime]);

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
