import { Button, Avatar, IconButton, Card, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { appLibrary } from 'src/common/utils/loading'
import { TopicsService, TopicWithPostCountDto } from 'src/common/open-api'
import TopicItem from 'src/components/topic-item'
import { Box } from '@mui/system'

const TopicListContainer = (): JSX.Element => {
  const [topicData, setTopicData] = useState({} as TopicWithPostCountDto[])

  useEffect(() => {
    getTopicList()
  }, [])

  const getTopicList = () => {
    appLibrary.showloading()
    TopicsService.withPostCount().then(
      data => {
        setTopicData(data)
        console.log(data)
        appLibrary.hideloading()
      },
      error => {
        console.log(error)
        appLibrary.hideloading()
      }
    )
  }

  return (
    <>
      {topicData.length > 0 ? (
        <div className="flex justify-self-center">
          <div className=" max-xl:w-full">
            <h2 className="justify-self-start">Chủ đề</h2>
            <Box sx={{ boxShadow: 3 }}>
              <Card variant="outlined" className="mb-[30px]">
                {topicData.map(topic => (
                  <TopicItem key={topic._id} topic={topic} />
                ))}
              </Card>
            </Box>
          </div>
          <div className="w-1/5 max-xl:hidden fixed right-[24px] mt-[53px]">
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default TopicListContainer
