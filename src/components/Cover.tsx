import styled from "styled-components";

const Cover = () => {
  return (
    <>
      <Gradient className="left" />
      <Gradient className="right" />
      <Gradient className="top-bottom" />
    </>
  );
};

const Gradient = styled.div`
  position: absolute;
  display: block;
  background-image: linear-gradient(
    to right,
    var(--color-bg),
    var(--color-bg) calc(100% - var(--fade-size)),
    transparent
  );
  right: 100%;
  top: -300px;
  width: 50vw;
  height: 200vh;
  z-index: 5;

  &.right {
    background-image: linear-gradient(
      to left,
      var(--color-bg),
      var(--color-bg) calc(100% - var(--fade-size)),
      transparent
    );
    right: auto;
    left: 100%;
  }

  &.top-bottom {
    background-image: linear-gradient(
      to bottom,
      var(--color-bg),
      var(--color-bg) calc(100% - var(--fade-size)),
      transparent
    );
    width: 100vw;
    bottom: 100%;
    top: auto;
    left: -300px;
    right: -300px;
    margin: auto;
    z-index: 4;
  }
`;

export default Cover;
