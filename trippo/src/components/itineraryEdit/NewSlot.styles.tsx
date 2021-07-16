import styled from "styled-components";
import * as c from "../../colors/colors";
import { Grid } from "@material-ui/core";

export const Cancel = styled.button`
  top: 0;
  right: 0;
  position: absolute;
  background: transparent;
  outline: 0;
  border: none;
  margin: 0.45em 0.5em 0 0;
  color: ${c.GREY};
  &:hover {
    cursor: pointer;
  }
`;

export const SlotContainer = styled(Grid)`
  margin: 0.5em 0;
`;

export const NewSlot = styled(Grid)`
  padding-bottom: 0.5em;
  border-radius: 0 10px 10px 0;
  width: 40em;
  background: #fff;
  border-left: 7px solid ${c.YELLOW};
  box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.5);
  position: fixed;
  color: ${c.BLACK};
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  z-index: 1;
  @media (max-width: 960px) {
    width: 60%;
  }
  &:hover {
    transform: translate(-50%, -51%);
  }

  .MuiFormControl-root{
    width: 90%;
  }
`;

export const Time = styled.div`
  color: ${c.BLACK};
  border-right: 1.5px solid ${c.DARK_GREY};
  width: 7.5em;
  padding-bottom: 0.5em;
  margin-left: 9px;

  div:before, div:after{
    content: none;
  }

  .MuiInput-root {
    font-size: 1em;
    letter-spacing: 0px;

  }

  @media (max-width: 960px) {
    border-right: 0px;
  }
`;

export const SlotGrid = styled(Grid)`
  @media (max-width: 960px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const Comments = styled.ul`
  margin-top: 0.25em;
  margin-right: 1.5em;
  color: ${c.BLACK};
  width: 100%;
  list-style: none;
  padding-left: 0.5em;
  @media (max-width: 960px) {
    margin-left: 1em;
  }
`;

export const AdressDiv = styled.h2`
  display: block;
  margin: 0 0 0 10px;
  font-weight: bold;
  font-size: 1em;
`;

export const NameDiv = styled.h1`
  display: inline-block;
  margin: 0.5em 1em 0 10px;
  font-weight: bold;
  font-size: 1.5em;
`;

export const AddButton = styled.button`
  background-color: ${c.DARK_BLUE};
  border-radius: 12px;
  color: ${c.WHITE};
  border: none;
  padding: 4px 10px;
  font-size: 1em;
  outline: none;
  margin: 0.5em 0.75em 0em auto;
  &:hover {
    cursor: pointer;
  }
`;

export const Destination = styled.div`
  color: ${c.BLACK};
  display: flex;
  flex-grow: 1;
  font-weight: 550;
  margin-bottom: 7px;
  i, svg {
    margin-right: 5px;
  }

  button {
    border: none;
    height: 2em;
    width: 2em;
    padding: 0;
    background-color: transparent;
    i {
      display: inline;
      color: ${c.DARK_BLUE};
      font-size: 1.75em;
    }
  }
  button:hover {
    cursor: pointer;
  }

`;