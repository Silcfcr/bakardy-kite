import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color, textColor, children, onClick }: ButtonProps) => (
  <StyledButton color={color} textColor={textColor} onClick={onClick}>
    {children}
  </StyledButton>
);
