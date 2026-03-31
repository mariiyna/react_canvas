import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import {Button} from "@/widgets";
import React from "react";

type ManagePanelProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export function ManagePanel({canvasRef}: ManagePanelProps) {
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

  return (
    <div className='flex justify-between flex-wrap'>
      <div className="flex items-center gap-5 cursor-pointer">
        <FaLongArrowAltLeft size={40}/>
        <FaLongArrowAltRight size={40}/>
      </div>
      <div className='flex items-center gap-3'>
        <Button
          variant='secondary'
          className='flex items-center gap-1'
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