import { CanvasBoard, Toolbar } from '@/features/draw';
import { Header } from '@/widgets/Header.tsx';

export const DrawPage = () => {
  return (
    <div className="px-2">
      <Header />
      <main>
        <Toolbar />
        <CanvasBoard />
      </main>
    </div>
  );
};
