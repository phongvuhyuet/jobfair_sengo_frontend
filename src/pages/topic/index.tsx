import { ReactElement } from 'react'
import Layout from 'src/containers/app-layout/index'
import TopicListContainer from 'src/containers/topic-list-container'
import { NextPageWithLayout } from '../_app'

const TopicList: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <TopicListContainer />
    </div>
  )
}

TopicList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default TopicList
