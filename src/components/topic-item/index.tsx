import { Button, Avatar, IconButton, Card, TextField, Typography, styled } from '@mui/material'
import { Box, alpha } from '@mui/system'
import { TopicsService, TopicWithPostCountDto } from 'src/common/open-api'
import ForumIcon from '@mui/icons-material/Forum'
import Link from 'next/link'

interface IProps {
  topic: TopicWithPostCountDto
}

const Hoverable = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  '&:hover': {
      background: alpha(theme.palette.primary.main, 0.1),
  }
}));


const TopicItem = ({ topic }: IProps): JSX.Element => {

  const content = (
    <Hoverable className="grid grid-cols-7 gap-4 border-solid border-b border-0 border-gray-300 px-9 py-6">
      <div className="col-span-1">
        <ForumIcon color="primary" sx={{width: 40, height: 40}}/>
      </div>
      <div className="col-span-5 flex items-center">
        <Typography variant="body1">{topic.name}</Typography>
      </div>
      <div className="col-span-1 flex items-center">
        <Typography variant="body1">{topic.countPost} bài viết</Typography>
      </div>
    </Hoverable>

  )

  return (
    <>
      <Link href={"topic/" + topic._id!}>
        <a>{content}</a>
      </Link>
    </>
  )
}

export default TopicItem
