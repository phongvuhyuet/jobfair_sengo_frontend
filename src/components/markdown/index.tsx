import { CircularProgress } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { editProps } from './initFullProps'

export default function Markdown(props) {
  const [loading, setLoading] = useState(true)
  const { type, content, setContent } = props
  return (
    <div className="relative h-[500px] lg:max-xl:w-[825px] xl:max-2xl:w-[1000px] 2xl:w-[1200px]">
      {loading && (
        <div className="absolute bg-[#EFF0F3] h-full w-full">
          <div className="absolute left-1/2 top-1/3 z-5">
            <CircularProgress />
          </div>
        </div>
      )}
      <Editor
        id={type}
        apiKey={process.env.NEXT_PUBLIC_API_TINY_KEY}
        value={content}
        init={{
          ...editProps,
        }}
        onInit={() => {
          setLoading(false)
        }}
        onEditorChange={content => {
          setContent(content)
        }}
      />

      {/* Covert string to html */}
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
    </div>
  )
}
