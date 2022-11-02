import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import { PostsService, PostResponseDto } from 'src/common/open-api'
import Layout from 'src/containers/app-layout/index'
import { NextPageWithLayout } from '../_app'

const PostList: NextPageWithLayout = () => {
  const [listPosts, setListPosts] = useState([] as PostResponseDto[])
  useEffect(() => {
    try {
      PostsService.posts1().then(resp => {
        console.log(resp)
        setListPosts(resp.reverse())
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Danh sách bài viết</h1>
      <ul className="list-none">
        {listPosts.map(post => (
          <div className="cursor-pointer hover:text-cyan-500 hover:bg-slate-200 p-2">
            <Link key={post._id} href={'/post/view/' + post._id}>
              <li>{post.title}</li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

PostList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default PostList
