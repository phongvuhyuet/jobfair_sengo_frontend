/*
  Properties config TinyMCE Editor.
*/

const editProps = {
  width: '100%',
  height: 500,
  menubar: false,
  statusbar: false,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'checklist',
    'link',
    'linkchecker',
    'powerpaste',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'code',
    'help',
    'wordcount',
    'export',
    'pageembed',
    'uploadcare',
  ],
  toolbar:
    'undo redo | fontsize fontfamily ' +
    'bold italic underline subscript superscript | backcolor forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | uploadcare media link | help |',
  toolbar_groups: {
    home: {
      icon: 'home',
      tooltip: 'Home',
      items: 'h1 h2 h3 h4 h5 h6',
    },
  },
  external_plugins: {
    uploadcare: 'https://uploadcare.github.io/uploadcare-tinymce/dist/uploadcare.tinymce@6.x/plugin.js',
  },
  uploadcare: {
    publicKey: process.env.NEXT_PUBLIC_API_UPLOADCARE_KEY,
    imageShrink: '500x375',
  },
  images_upload_url: 'postAcceptor.php',
  automatic_uploads: false,
  contextmenu: 'newdocument preview copy cut paste selectall',
  content_style: 'body { font-family:"Be Vietnam"; font-size:14px, width: "100%", border: "1px solid red" }',
}

export { editProps }
