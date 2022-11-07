import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import PostContainer from 'src/containers/post-container'
import TopicContainer from 'src/containers/topic-container'
import { NextPageWithLayout } from '../../_app'

const NewTopic: NextPageWithLayout = () => {
  return <TopicContainer />
}

NewTopic.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default NewTopic
