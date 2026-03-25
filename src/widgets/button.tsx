import styled from "styled-components";

type ButtonProps = {
  onClick?: () => void;
  text: string;
  variant?: "primary" | "secondary";
};

const StyledBtn = styled.button<{ $variant: "primary" | "secondary" }>`
  padding: 10px 30px;
  color: #fff;
  border: none;
  outline: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $variant }) => ($variant === "secondary" ? "#ab711b" : "#5b68b5")};
`;

export function Button({ onClick, text, variant = "primary" }: ButtonProps) {
  return (
    <StyledBtn onClick={onClick} type="button" $variant={variant}>
      {text}
    </StyledBtn>
  );
}