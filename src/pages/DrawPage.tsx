import { CanvasBoard, Toolbar } from "@/features/draw";

export const DrawPage = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Рисование на холсте
      </h1>
      <Toolbar />
      <CanvasBoard />
    </>
  )
};