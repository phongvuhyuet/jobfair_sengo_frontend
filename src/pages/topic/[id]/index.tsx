import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostsOfTopicContainer from 'src/containers/posts-of-topic-container'
import { NextPageWithLayout } from '../../_app'
import { useRouter } from 'next/router'

const PostOfTopicList: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query['id'] as string

  return (
    <div className="flex flex-col justify-center items-center ">
      <PostsOfTopicContainer id={id}/>
    </div>
  )
}

PostOfTopicList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostOfTopicList
