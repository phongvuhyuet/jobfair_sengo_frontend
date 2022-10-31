import { Editor } from '@tinymce/tinymce-react'
import { editProps } from './initFullProps'

export default function Markdown(props) {
  const { type, content, setContent } = props
  return (
    <>
      <Editor
        id={type}
        apiKey={process.env.NEXT_PUBLIC_API_TINY_KEY}
        value={content}
        init={{
          ...editProps,
        }}
        onEditorChange={content => {
          setContent(content)
        }}
      />

      {/* Covert string to html */}
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
    </>
  )
}
