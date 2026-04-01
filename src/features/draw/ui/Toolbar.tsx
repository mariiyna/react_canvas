import { useDispatch } from 'react-redux';
import { setActiveTool } from '@/features/draw/model/toolSlice';
import { Button } from '@/widgets';

export function Toolbar() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center gap-5 py-3">
      <Button onClick={() => dispatch(setActiveTool('brush'))}>Кисть</Button>
      <Button
        onClick={() => dispatch(setActiveTool('eraser'))}
        variant="secondary"
      >
        Ластик
      </Button>
    </div>
  );
}
