import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import { PostsService, PostResponseDto } from 'src/common/open-api'
import { appLibrary } from 'src/common/utils/loading'
import PostItem from 'src/components/post-item'
import Layout from 'src/containers/app-layout/index'
import { NextPageWithLayout } from '../_app'

const PostList: NextPageWithLayout = () => {
  const [listPosts, setListPosts] = useState([] as PostResponseDto[])
  useEffect(() => {
    appLibrary.showloading()
    try {
      PostsService.posts1().then(resp => {
        console.log(resp)
        setListPosts(resp.reverse())
        appLibrary.hideloading()
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Danh sách bài viết</h1>
      <ul className="list-none">
        {listPosts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  )
}

PostList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostList
