import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostContainer from 'src/containers/post-container'
import { NextPageWithLayout } from '../../_app'

const NewPost: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Tạo bài viết</h1>
      <PostContainer />
    </div>
  )
}

NewPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default NewPost
