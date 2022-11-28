import { useEffect, useState } from 'react'
import { PostResponseDto, PostsService, TopicRespDto, TopicsService } from '../../common/open-api/swagger.gen'
import { Box, Button, Card, Typography } from '@mui/material'
import { appLibrary } from 'src/common/utils/loading'
import PostItem from 'src/components/post-item'
import Link from 'next/link'

interface IProps {
  id: string
}
const PostsOfTopicContainer = ({ id }: IProps): JSX.Element => {
  const [postListData, setPostListData] = useState([] as PostResponseDto[])
  const [topic, setTopic] = useState({} as TopicRespDto)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = () => {
    appLibrary.showloading()
    setLoading(true)
    Promise.all([PostsService.filter({ topicId: id }), TopicsService.topics4({ id: id })])
      .then(([post, topic]) => {
        setPostListData(post)
        setTopic(topic)

        console.log(post)
        console.log(topic)

        setLoading(false)
        appLibrary.hideloading()
      })
      .catch(error => {
        console.log(error)
        appLibrary.hideloading()
      })
  }

  return (
    <div className="min-w-[65%] justify-items-center">
      {postListData.length > 0 ? (
        <div className="max-xl:w-full">
          <ul className="list-none">
            <h2 className="mt-0">{topic.name}</h2>
            {postListData.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </div>
      ) : (
        !loading && (
          <div className="w-full justify-items-start">
            <h2 className="mt-0">{topic.name}</h2>
            <Box sx={{ boxShadow: 3 }}>
              <Card variant="outlined" className="p-8 min-w-full justify-items-center text-center">
                <Typography variant="body1">Hiện tại chưa có bài viết nào thuộc chủ đề này</Typography>
                <Button variant="contained" className="text-white self-center normal-case mt-3">
                  <Link href="/topic">
                    <a>Quay lại</a>
                  </Link>
                </Button>
              </Card>
            </Box>
          </div>
        )
      )}
    </div>
  )
}

export default PostsOfTopicContainer
