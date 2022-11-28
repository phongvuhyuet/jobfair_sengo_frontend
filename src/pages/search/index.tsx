import { ReactElement, useEffect, useState } from 'react'
import Layout from 'src/containers/app-layout/index'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'
import { appLibrary } from 'src/common/utils/loading'
import { PostResponseDto, PostsService } from 'src/common/open-api'
import PostItem from 'src/components/post-item'

interface IProps {
  params: {
    title: string
  }
}
const Search: NextPageWithLayout<IProps> = (props: IProps) => {
  const [searchResult, setSearchResult] = useState<PostResponseDto[]>([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    appLibrary.showloading()
    try {
      PostsService.filter({ title: props.params.title }).then(resp => {
        setSearchResult(resp)
        if (resp.length == 0) {
          setMessage('Không tìm thấy bài viết nào phù hợp')
        }
        appLibrary.hideloading()
      })
    } catch (error) {
      console.log(error)
    }
  }, [props.params.title])
  return (
    <div className="flex flex-col justify-center items-center ">
      {searchResult.length > 0 ? (
        <ul className="list-none">
          <h2 className="mt-0">Kết quả tìm kiếm</h2>
          {searchResult.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  let title = context.query.post_title?.toString() || ''
  return {
    props: {
      params: {
        title: title,
      },
    },
  }
}

export default Search
