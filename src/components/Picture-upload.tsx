'use client'

import { Camera } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useCloudinaryUpload } from '../hooks/use-cloudinary-upload'

interface ProfilePictureUploadProps {
  currentImage: string | null
  onUpload: (url: string) => void
}

export function ProfilePictureUpload({ currentImage, onUpload }: ProfilePictureUploadProps) {
  const { uploadImage, uploading } = useCloudinaryUpload()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const url = await uploadImage(file)
      if (url) {
        onUpload(url)
      }
    }
  }, [uploadImage, onUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div
      {...getRootProps()}
      className="relative mx-auto w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
    >
      <input {...getInputProps()} />
      {currentImage ? (
        <img
          src={currentImage}
          alt="Profile picture"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="h-8 w-8 text-gray-400" />
        </div>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
        </div>
      )}
    </div>
  )
}

