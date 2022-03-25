import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: #000;
  }
`;

export const StyleSlider = styled.div`
  position: relative;
  margin: 2rem;
  border-radius: 5px;
  background: teal;
  height: calc(100vh - 4rem);
`;

export const StyledThumb = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  top: -5px;
  opacity: 0.7;
  background: #fff;
  cursor: pointer;
`;

export const StyledCoordinates = styled.div`
  position: absolute;
  margin: 1rem;
  padding: 1rem;
  background: #fff;
  width: 10vw;
  right: 0;
  top: 0;
  border-radius: 5px;
  text-align: center;
`;