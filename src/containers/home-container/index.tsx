import { useEffect, useState } from 'react'
import { PostResponseDto, PostsService } from '../../common/open-api/swagger.gen'
import { Card } from '@mui/material'
import { appLibrary } from 'src/common/utils/loading'
import PostItem from 'src/components/post-item'
import Complementary from 'src/components/complementary'

const HomeContainer = (): JSX.Element => {
  const [listPostsNewest, setListPostsNewest] = useState([] as PostResponseDto[])

  useEffect(() => {
    appLibrary.showloading()
    try {
      PostsService.newest().then(resp => {
        setListPostsNewest(resp)
        appLibrary.hideloading()
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <>
      {listPostsNewest.length > 0 ? (
        <div className="flex">
          <div className="w-3/4 max-xl:w-full">
            <ul className="list-none">
              <h2 className="mt-0">Bài viết mới nhất</h2>
              {listPostsNewest.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
            <ul className="list-none">
              <h2 className="mt-0">Bài viết nổi bật</h2>
              {listPostsNewest.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
          </div>
          <div className="w-1/5 max-xl:hidden fixed right-[24px] mt-[53px]">
            <Complementary />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default HomeContainer
