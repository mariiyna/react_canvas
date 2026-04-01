import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import {Button} from "@/widgets";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {redoStep, undoStep} from "@/features/manageDraw/model/historySlice.ts";

type ManagePanelProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export function ManagePanel({canvasRef}: ManagePanelProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch()

  const handleDownload = () => {
    const canvas = canvasRef?.current
    if (!canvas) {
      console.error('Ошибка при скачивании')
      return
    }

    const imgUrl = canvas.toDataURL('image/png')

    const tempLink = document.createElement('a')
    tempLink.download = 'Рисунок.png'
    tempLink.href = imgUrl
    tempLink.click()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current
    const canvasContext = canvas.getContext('2d')
    if (!canvasContext) {
      return;
    }

    const img = new Image()

    img.onload = () => {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height)

      const hRatio = canvas.width / img.width
      const vRatio =  canvas.height / img.height

      const ratio  = Math.min(hRatio, vRatio)

      const centerShift_x = ( canvas.width - img.width*ratio ) / 2
      const centerShift_y = ( canvas.height - img.height*ratio ) / 2

      canvasContext.drawImage(img, 0,0, img.width, img.height,
        centerShift_x, centerShift_y, img.width*ratio, img.height*ratio)

      e.target.value = ""
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    <div className='flex justify-between flex-wrap'>
      <div className="flex items-center gap-5">
        <Button
          className='cursor-pointer p-1!'
          variant='secondary'
          onClick={() => dispatch(undoStep())}
        >
          <FaLongArrowAltLeft size={40}/>
        </Button>
        <Button
          className='cursor-pointer p-1!'
          variant='secondary'
          onClick={() => dispatch(redoStep())}
        >
          <FaLongArrowAltRight size={40}/>
        </Button>
      </div>
      <div className='flex items-center gap-3'>
        <input
          ref={fileInputRef}
          className='opacity-0 w-0 h-0'
          type="file"
          accept="image/png"
          onChange={handleImageUpload}
        />
        <Button
          variant='secondary'
          className='flex items-center gap-1'
          onClick={() => fileInputRef.current?.click()}
        >
          <MdOutlineSaveAlt/>
          Загрузить
        </Button>
        <Button
          variant='secondary'
          className='flex items-center gap-1'
          onClick={handleDownload}
        >
          <FaFileDownload/>
          Скачать
        </Button>
      </div>
    </div>
  )
}