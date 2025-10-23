import styled from "styled-components";
import { PRIMARY, INTERACTIVE, NEUTRAL } from "../../styles/colors";

export const StyledButton = styled("button") <{ color?: string; textColor?: string }>`
  background: ${(p) => p.color || PRIMARY.main};
  color: ${(p) => p.textColor || (p.color ? PRIMARY.main : PRIMARY.contrast)};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid ${NEUTRAL.gray};
  border-radius: 6px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: ${(p) => p.textColor || PRIMARY.contrast};
    border: 1px solid ${INTERACTIVE.hover};
    background-color: ${INTERACTIVE.hover};
  }
`;
