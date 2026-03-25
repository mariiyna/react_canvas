import { useDispatch } from "react-redux";
import { setActiveTool } from "@/features/draw/model/toolSlice";
import { Button } from "@/widgets";

export function Toolbar() {
  const dispatch = useDispatch();

  return (
    <div className='flex justify-center gap-5 py-3'>
      <Button onClick={() => dispatch(setActiveTool("brush"))} text="Кисть" />
      <Button
        onClick={() => dispatch(setActiveTool("eraser"))}
        text="Ластик"
        variant="secondary"
      />

      {/* <Button
        onClick={() => dispatch(clear("eraser"))}
        text="Очистить"
      /> */}
    </div>
  );
}
