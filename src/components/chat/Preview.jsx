import React from 'react'
import { useFileUploadContext } from '../../contexrt/FileUplaodContext'
useFileUploadContext
export const Preview = () => {
  const { file } = useFileUploadContext()
  return <>
    <h1>Preview</h1>
    {file.map((res, index) => {
      return <img src={res.url} alt="" key={index} style={{
        height: "200px",
        width: "200px"
      }} />
    })}

  </>
}
