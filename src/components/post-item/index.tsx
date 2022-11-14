import { Avatar, Button, Card } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import Link from 'next/link'
import { Formatter } from 'src/common/helpers'
import { Box } from '@mui/system'
import TagItem from '../tag'

export default function PostItem({ post }) {
  return (
    <Box sx={{ boxShadow: 3 }}>
      <Card key={post._id} variant="outlined" className="mb-[30px]">
        <li className="grid grid-cols-11 gap-3 p-3">
          <div className="col-start-1 col-end-3 flex flex-col items-center justify-between">
            <Link href="">
              <Avatar sx={{ width: 130, height: 130 }}></Avatar>
            </Link>
            <div>{post.user ? post.user.name : 'unknown'}</div>
          </div>
          <div className="col-start-3 col-end-11 flex flex-col justify-between">
            <div>
              <TagItem topic={post.topic} />
              <div className="mt-2 font-bold">
                <Link href={'/post/view/' + post._id}>
                  <span className="cursor-pointer hover:text-cyan-500">{post.title}</span>
                </Link>
              </div>
            </div>
            <div className="justify-self-end text-gray-400">{Formatter.dateTime(post.createdAt)}</div>
          </div>
          <div className="col-start-11 col-end-11 flex flex-col justify-end">
            <div className="flex flex-row items-center">
              <KeyboardArrowUpIcon color="primary" />
              <span className="ml-2">{post.upvote_count}</span>
            </div>
            <div className="flex flex-row items-center">
              <CommentOutlinedIcon color="primary" />
              <span className="ml-2">100</span>
            </div>
          </div>
        </li>
      </Card>
    </Box>
  )
}
