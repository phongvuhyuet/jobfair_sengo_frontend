import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostContainer from 'src/containers/post-container'
import { NextPageWithLayout } from '../../_app'

const PostDetail: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Chỉnh sửa bài viết</h1>
      <PostContainer post={1} />
    </div>
  )
}

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostDetail
