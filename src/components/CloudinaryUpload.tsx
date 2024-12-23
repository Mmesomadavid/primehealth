'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface CloudinaryUploadProps {
  onUpload: (url: string) => void
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'primehealth')

    fetch(`https://api.cloudinary.com/v1_1/mmesoma/image/upload`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        onUpload(data.secure_url)
      })
      .catch(err => console.error('Error uploading image:', err))
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      {
        isDragActive ?
          <p className="mt-2">Drop the image here ...</p> :
          <p className="mt-2">Drag 'n' drop an image here, or click to select one</p>
      }
    </div>
  )
}

export default CloudinaryUpload

