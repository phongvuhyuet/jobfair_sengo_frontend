import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostViewContainer from 'src/containers/post-view-container'
import { NextPageWithLayout } from '../../../_app'
import { useRouter } from 'next/router'

const PostView: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query['id'] as string

  return (
    <div className="flex flex-col justify-center items-center ">
      <PostViewContainer id={id} />
    </div>
  )
}

PostView.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostView
