'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

const ImageCropper = ({
  image,
  onCropComplete,
  aspect = 4 / 3,
  showCropper,
}) => {
  const canvasRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [img, setImg] = useState(null)

  useEffect(() => {
    const imgEl = new Image()
    imgEl.crossOrigin = 'anonymous'
    imgEl.onload = () => {
      setImg(imgEl)
      drawCanvas(imgEl, scale, position)
    }
    imgEl.src = image
  }, [image])

  useEffect(() => {
    if (img) {
      drawCanvas(img, scale, position)
    }
  }, [scale, position, img])

  const drawCanvas = (imgEl, currentScale, currentPosition) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = width / aspect

    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)

    // Calculate scaled dimensions
    const scaledWidth = imgEl.width * currentScale
    const scaledHeight = imgEl.height * currentScale

    // Draw image
    ctx.drawImage(
      imgEl,
      currentPosition.x,
      currentPosition.y,
      scaledWidth,
      scaledHeight
    )

    // Draw crop area overlay
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, width, height)

    // Draw grid lines (rule of thirds)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)' // semi-transparent white
    ctx.lineWidth = 1

    // Vertical lines
    ctx.beginPath()
    ctx.moveTo(width / 3, 0)
    ctx.lineTo(width / 3, height)
    ctx.moveTo((2 * width) / 3, 0)
    ctx.lineTo((2 * width) / 3, height)
    ctx.stroke()

    // Horizontal lines
    ctx.beginPath()
    ctx.moveTo(0, height / 3)
    ctx.lineTo(width, height / 3)
    ctx.moveTo(0, (2 * height) / 3)
    ctx.lineTo(width, (2 * height) / 3)
    ctx.stroke()
  }

  const handleMouseDown = (e) => {
    setDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (!dragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleCrop = () => {
    const canvas = canvasRef.current
    canvas.toBlob((blob) => {
      if (blob && onCropComplete) {
        const file = new File([blob], 'cropped-image.png', {
          type: 'image/png',
        })
        onCropComplete(file)
      }
      showCropper(false)
    }, 'image/png')
  }

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center'>
      <div className='relative w-[95%] max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden'>
        <button
          onClick={() => showCropper(false)}
          className='absolute top-4 right-4 p-2 bg-gray-800/60 hover:bg-gray-700 text-white rounded-full z-20'
        >
          <X size={18} />
        </button>

        <div className='p-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Crop Your Image
          </h2>
          <div className='relative rounded-lg overflow-hidden bg-gray-900'>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className='cursor-move w-full h-auto'
            />
          </div>
        </div>

        <div className='p-4 border-t bg-gray-50'>
          <div className='flex items-center gap-4 mb-4'>
            <ZoomOut className='text-indigo-500 w-5 h-5' />
            <input
              type='range'
              min={0.5}
              max={3}
              step={0.1}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className='w-full accent-indigo-600'
            />
            <ZoomIn className='text-indigo-500 w-5 h-5' />
            <span className='text-sm text-gray-600 w-10 text-right'>
              {scale.toFixed(1)}x
            </span>
          </div>

          <div className='flex justify-end gap-3'>
            <Button
              variant='outline'
              onClick={() => showCropper(false)}
              className='px-4 py-2'
            >
              Cancel
            </Button>
            <Button
              onClick={handleCrop}
              className='px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700'
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TestCropPage = () => {
  const [showCropper, setShowCropper] = useState(false)
  const [image, setImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
      setShowCropper(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedFile) => {
    if (croppedFile) {
      const croppedURL = URL.createObjectURL(croppedFile)
      setCroppedImage(croppedURL)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-10'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>
        🖼️ Image Cropper Demo
      </h1>

      <label className='cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
        />
        Choose an Image
      </label>

      {croppedImage && (
        <div className='mt-8 text-center'>
          <h2 className='font-semibold text-lg mb-3 text-gray-700'>
            Cropped Result:
          </h2>
          <img
            src={croppedImage}
            alt='Cropped'
            className='max-w-md w-full rounded-lg shadow-lg border-4 border-white'
          />
        </div>
      )}

      {showCropper && image && (
        <ImageCropper
          image={image}
          onCropComplete={handleCropComplete}
          aspect={4 / 3}
          showCropper={setShowCropper}
        />
      )}

      {!showCropper && image && (
        <Button
          onClick={() => setShowCropper(true)}
          className='mt-6 bg-indigo-600 hover:bg-indigo-700'
        >
          Reopen Cropper
        </Button>
      )}
    </div>
  )
}

export default TestCropPage
