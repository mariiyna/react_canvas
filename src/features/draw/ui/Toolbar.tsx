import { useDispatch } from "react-redux";
import { setActiveTool } from "@/features/draw/model/toolSlice";
import { Button } from "@/widgets";
import styled from "styled-components";

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 1rem;
`;

export function Toolbar() {
  const dispatch = useDispatch();

  return (
    <ToolbarContainer>
      <Button onClick={() => dispatch(setActiveTool("brush"))} text="Кисть" />
      <Button
        onClick={() => dispatch(setActiveTool("eraser"))}
        text="Ластик"
        variant="secondary"
      />

      {/* <Button
        onClick={() => dispatch(setActiveTool("eraser"))}
        text="Очистить"
      /> */}
    </ToolbarContainer>
  );
}
