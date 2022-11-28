import { Button, Avatar, IconButton, Card, TextField, Typography } from '@mui/material'
import { Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { useEffect, useState } from 'react'
import { PostResponseDto, PostsService } from 'src/common/open-api'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Sms from '@mui/icons-material/Sms'
import { Formatter } from 'src/common/helpers'
import { appLibrary } from 'src/common/utils/loading'
import TagItem from 'src/components/tag'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface IProps {
  id: string
}

const PostContainer = ({ id }: IProps): JSX.Element => {
  const [postData, setPostData] = useState({} as PostResponseDto)
  const [error, setError] = useState(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    getPostData()
  }, [id])

  const getPostData = () => {
    if (!id) return
    appLibrary.showloading()
    PostsService.posts3({ id: id }).then(
      data => {
        setPostData(data)
        console.log(data)
        appLibrary.hideloading()
      },
      error => {
        const message = error.response.data.message
        setError(message)
        appLibrary.hideloading()
      }
    )
  }

  const onhandleVote = async (is_upvote: boolean) => {
    appLibrary.showloading()
    try {
      const { message } = await PostsService.vote({ id: id, body: { is_upvote: is_upvote } })
      if (message === 'vote success') {
        getPostData()
      }
    } catch (error) {
      console.log(error)
      toast.error('Vote không thành công')
    } finally {
      appLibrary.hideloading()
    }
  }

  const handleVote = (is_upvote: boolean) => {
    onhandleVote(is_upvote)
  }

  const onDeleteClicked = () => {
    setAnchorEl(null)
    setOpenDelete(true)
  }

  const onDeleteConfirm = async () => {
    appLibrary.showloading()
    try {
      await PostsService.posts2({ id: id })
      appLibrary.hideloading()
      toast.success('Đã xóa bài viết thành công')
      Router.push("/topic/" + postData.topic?._id)
    } catch (error) {
      console.log(error)
      toast.error('Xóa bài viết không thành công')
      setOpenDelete(false)
      appLibrary.hideloading()
    }
  }

  const onDeleteCancel = () => {
    setOpenDelete(false)
  }

  const showContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeContextMenu = () => {
    setAnchorEl(null)
  }

  if (error) {
    //Todo: use theme color instead
    return (
      <Card className="p-3 px-10 pb-7 text-center">
        <p className="text-red-400">Đã xảy ra lỗi khi hiển thị bài đăng!</p>
        {error}
      </Card>
    )
  }

  return (
    <Card className="p-3 w-[65%]">
      <div className="grid grid-cols-6 gap-4 p-3">
        {/* Row: avatar, tag, title, date */}
        <Avatar sx={{ width: 80, height: 80 }} className="col-span-1 self-center justify-self-center">
          {postData.user?.name?.toLocaleUpperCase()[0] ?? '-'}
        </Avatar>
        <div className="col-span-4">
          {postData.topic && <TagItem topic={postData.topic}></TagItem>}
          <p className="font-semibold text-2xl my-3">
            {postData.title ?? ''}{' '}
          </p>
        </div>
        <div className="col-span-1 grid justify-items-end">
          <IconButton className="m-l-auto" onClick={showContextMenu} >
            <MoreHorizIcon />
          </IconButton>
          <Typography className="italic font-light mr-3" variant="subtitle1">
            {Formatter.dateTime(postData.createdAt)}
          </Typography>
        </div>

        {/* Row: author, vote, comment */}
        <p className="my-2 text-center text-xs">{postData.user?.name ?? '-'}</p>
        <div className="flex-row col-span-5 gap-[10px]">
          <div className="inline pr-1">
            <IconButton sx={{ color: 'primary.light' }} onClick={() => handleVote(true)}>
              <KeyboardArrowUp />
            </IconButton>
            <span className="font-semibold">{postData.upvote_count ?? '-'}</span>
          </div>
          <div className="inline pr-1">
            <IconButton onClick={() => handleVote(false)}>
              <KeyboardArrowDown />
            </IconButton>
            <span className="font-semibold">{postData.downvote_count ?? '-'}</span>
          </div>
          <div className="inline pr-1">
            <IconButton sx={{ color: 'primary.light' }}>
              <Sms />
            </IconButton>
            <span className="font-semibold">-</span>
          </div>
        </div>
      </div>
      <div className="p-3" dangerouslySetInnerHTML={{ __html: postData.content ?? '' }}></div>

      {/* Comment */}
      <div className="border-solid border-t border-0 border-gray-300 p-3 grid grid-cols-6">
        <div className="col-span-1 self-start justify-self-center mt-3 mr-5 items-center">
          <Avatar sx={{ width: 80, height: 80 }} className="mb-5 ml-auto mr-auto">
            N
          </Avatar>
          <p className="my-2 text-center text-xs">Nguyen Van Quynh</p>
        </div>
        <div className="col-span-5">
          <div className="flex-row">
            <div className="inline-block pt-2 pb-4">Bình Luận</div>
            <Button variant="text" type="submit" className="inline self-center float-right normal-case text-gray-400">
              + Chọn tập tin
            </Button>
          </div>
          <TextField placeholder="Viết bình luận" multiline fullWidth minRows={3} />
          <Button variant="contained" type="submit" className="text-white self-center float-right normal-case mt-3">
            Gửi
          </Button>
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeContextMenu} >
        <Link href={'/post/' + postData._id}>
          <MenuItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              Sửa bài viết
            </ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={onDeleteClicked}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>
            Xóa bài viết
          </ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={openDelete} keepMounted>
        <DialogTitle>Bạn có chắc chắn muốn xóa bài viết?</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={onDeleteConfirm}
            color="primary"
            className="w-1/3 !text-white self-center"
          >
            Xóa
          </Button>
          <Button
            variant="contained"
            onClick={onDeleteCancel}
            color="secondary"
            className="w-1/3 text-white self-center"
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default PostContainer
