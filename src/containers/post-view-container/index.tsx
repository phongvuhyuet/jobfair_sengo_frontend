import { Button, Avatar, IconButton, Card, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { PostResponseDto, PostsService } from 'src/common/open-api'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Sms from '@mui/icons-material/Sms';
import { Formatter } from 'src/common/helpers'

export interface IProps {
  id?: string
}

const PostContainer = ({ id }: IProps): JSX.Element => {
  const [ postData, setPostData ] = useState({} as PostResponseDto)
  const [ error, setError ] = useState(null)
  
  useEffect(() => {
    getPostData();
  }, [id])

  const getPostData = () => {
    if (!id) return
    PostsService.posts4({ id: id })
      .then(
        setPostData,
        (error) => {
          const message = error.response.data.message;
          setError(message);
        })
  }

  if (error) {
    //Todo: use theme color instead
    return (
      <Card className="p-3 px-10 pb-7 text-center">
        <p className="text-red-400">Đã xảy ra lỗi khi hiển thị bài đăng!</p>
        { error }
      </Card>
    )
  }

  return (
    <Card className="p-3">
      <div className="grid grid-cols-6 gap-4 p-3">

        {/* Row: avatar, tag, title, date */}
        <Avatar sx={{width: 80, height: 80}} className="col-span-1 self-center justify-self-center">Q</Avatar>
        <div className="col-span-4">
          <Button variant="outlined" type="submit" className="normal-case p-1 py-0">Tag</Button>
          <p className="font-semibold text-2xl my-3">{postData.title ?? ""}</p>
        </div>
        <div className="col-span-1">
          <p className="italic font-light text-xs">{Formatter.dateTime(postData.createdAt)}</p>
        </div>

        {/* Row: author, vote, comment */}
        <p className="my-2 text-center text-xs">Nguyen Van Quynh</p>
        <div className="flex-row col-span-5 gap-[10px]">
          <div className="inline pr-1">
            <IconButton sx={{color: "primary.light"}}><KeyboardArrowUp/></IconButton>
            <span className="font-semibold">{postData.upvote_count ?? "-"}</span>
          </div>
          <div className="inline pr-1">
            <IconButton ><KeyboardArrowDown/></IconButton>
            <span className="font-semibold">{postData.downvote_count ?? "-"}</span>
          </div>
          <div className="inline pr-1">
            <IconButton sx={{color: "primary.light"}}><Sms/></IconButton>
            <span className="font-semibold">-</span>
          </div>
        </div>
      </div>
      <div className="p-3" dangerouslySetInnerHTML={{__html: postData.content ?? ""}}></div>

      {/* Comment */}
      <div className="border-solid border-t border-0 border-gray-300 p-3 grid grid-cols-6">
        <div className="col-span-1 self-start justify-self-center mt-3 mr-5 items-center">
          <Avatar sx={{width: 80, height: 80}} className="mb-5 ml-auto mr-auto">N</Avatar>
          <p className="my-2 text-center text-xs">Nguyen Van Quynh</p>
        </div>
        <div className="col-span-5">
          <div className="flex-row">
            <div className="inline-block pt-2 pb-4">Bình Luận</div>
            <Button variant="text" type="submit" className="inline text-white self-center float-right normal-case text-gray-400">+ Chọn tập tin</Button>
          </div>
          <TextField placeholder="Viết bình luận" multiline fullWidth minRows={3}/>
          <Button variant="contained" type="submit" className="text-white self-center float-right normal-case mt-3">Gửi</Button>
        </div>
      </div>
    </Card>
  )
}

export default PostContainer
