import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostContainer from 'src/containers/post-container'
import { NextPageWithLayout } from '../../_app'
import { useRouter } from 'next/router'

const PostDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const id = (router.query['id'] as string) || ''
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Chỉnh sửa bài viết</h1>
      <PostContainer id={id} />
    </div>
  )
}

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostDetail
