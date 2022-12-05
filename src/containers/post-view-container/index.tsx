import { Button, Avatar, IconButton, Card, TextField, Typography, Divider } from '@mui/material'
import { Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { useEffect, useState } from 'react'
import { CommentResponseDto, CommentsService, PostResponseDto, PostsService } from 'src/common/open-api'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SendIcon from '@mui/icons-material/Send'
import Sms from '@mui/icons-material/Sms'
import { Formatter } from 'src/common/helpers'
import { appLibrary } from 'src/common/utils/loading'
import TagItem from 'src/components/tag'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import Comment from 'src/components/comment'

type CommentFormInputs = {
  comment: string
}

export interface IProps {
  id: string
}

enum VoteState {
  None,
  Upvoted,
  Downvoted,
}

const PostContainer = ({ id }: IProps): JSX.Element => {
  const [postData, setPostData] = useState({} as PostResponseDto)
  const [voteState, setVoteState] = useState(VoteState.None)
  const [error, setErrorMessage] = useState(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [openDelete, setOpenDelete] = useState(false)
  const [commentData, setCommentData] = useState<CommentResponseDto[]>([])

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CommentFormInputs>({ criteriaMode: 'all' })

  useEffect(() => {
    getPostData()
  }, [id])

  const getPostData = () => {
    if (!id) return
    appLibrary.showloading()
    Promise.all([
      PostsService.posts3({ id: id }),
      PostsService.isVoted({ id: id }),
      CommentsService.comments1({ postId: id }),
    ]).then(
      ([post, isVote, comment]) => {
        setPostData(post)
        console.log(comment)
        setCommentData(comment)
        const isVoteResult: string = (isVote.result as unknown) as string
        switch (isVoteResult) {
          case 'upvoted':
            setVoteState(VoteState.Upvoted)
            break
          case 'downvoted':
            setVoteState(VoteState.Downvoted)
            break
          default:
            setVoteState(VoteState.None)
            break
        }
        appLibrary.hideloading()
      },
      error => {
        const message = error.response.data.message
        setErrorMessage(message)
        appLibrary.hideloading()
      }
    )
  }

  const onhandleVote = async (is_upvote: boolean) => {
    appLibrary.showloading()
    try {
      const { message } = await PostsService.vote({ id: id, body: { is_upvote: is_upvote } })
      if (is_upvote) {
        const changeUpvoteCount = voteState === VoteState.Upvoted ? -1 : 1
        const changeDownvoteCount = voteState === VoteState.Downvoted ? -1 : 0
        setPostData({
          ...postData,
          upvote_count: postData.upvote_count! + changeUpvoteCount,
          downvote_count: postData.downvote_count! + changeDownvoteCount,
        })
        setVoteState(voteState === VoteState.Upvoted ? VoteState.None : VoteState.Upvoted)
      } else {
        const changeUpvoteCount = voteState === VoteState.Upvoted ? -1 : 0
        const changeDownvoteCount = voteState === VoteState.Downvoted ? -1 : 1
        setPostData({
          ...postData,
          upvote_count: postData.upvote_count! + changeUpvoteCount,
          downvote_count: postData.downvote_count! + changeDownvoteCount,
        })
        setVoteState(voteState === VoteState.Downvoted ? VoteState.None : VoteState.Downvoted)
      }
    } catch (error) {
      console.log(error)
      toast.error('Vote không thành công')
    } finally {
      appLibrary.hideloading()
    }
  }

  const onCommentSubmit = (data: CommentFormInputs) => {
    const { comment } = data
    reset()
    handleCreateComment(comment)
  }

  const handleCreateComment = async (comment: string) => {
    appLibrary.showloading()
    try {
      const { content } = await CommentsService.comments({ body: { content: comment, post_id: id } })
      if (content) {
        const comment = await CommentsService.comments1({ postId: id });
        setCommentData(comment);
      }
    } catch (error) {
      console.log(error)
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
      Router.push('/topic/' + postData.topic?._id)
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
    <Card className="p-5 w-[65%] mb-5">
      <div className="grid grid-cols-6 gap-4 p-3">
        {/* Row: avatar, tag, title, date */}
        <Avatar sx={{ width: 80, height: 80 }} className="col-span-1 self-center justify-self-center">
          {postData.user?.name?.toLocaleUpperCase()[0] ?? '-'}
        </Avatar>
        <div className="col-span-4">
          {postData.topic && <TagItem topic={postData.topic}></TagItem>}
          <p className="font-semibold text-2xl my-3">{postData.title ?? ''} </p>
        </div>
        <div className="col-span-1 grid justify-items-end">
          <IconButton className="m-l-auto" onClick={showContextMenu}>
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
            <IconButton
              sx={voteState === VoteState.Upvoted ? { color: 'primary.light' } : {}}
              onClick={() => handleVote(true)}
            >
              <KeyboardArrowUp />
            </IconButton>
            <span className="font-semibold">{postData.upvote_count ?? '-'}</span>
          </div>
          <div className="inline pr-1">
            <IconButton
              sx={voteState === VoteState.Downvoted ? { color: 'primary.light' } : {}}
              onClick={() => handleVote(false)}
            >
              <KeyboardArrowDown />
            </IconButton>
            <span className="font-semibold">{postData.downvote_count ?? '-'}</span>
          </div>
          <div className="inline pr-1">
            <IconButton sx={{ color: 'primary.light' }}>
              <Sms />
            </IconButton>
            <span className="font-semibold"> {commentData.length}</span>
          </div>
        </div>
      </div>
      <div className="mx-5 p-3" dangerouslySetInnerHTML={{ __html: postData.content ?? '' }}></div>

      <div className="min-w-full">
        <Divider />
        <h4 className="p-3">Bình luận</h4>
        <div className="flex flex-row gap-[10px] mt-3 mb-[25px] mx-3">
          <Avatar>N</Avatar>
          <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit(onCommentSubmit)}>
              <div className="flex items-center w-full">
                <TextField
                  placeholder="Viết bình luận"
                  multiline
                  fullWidth
                  variant="outlined"
                  minRows={1}
                  size="small"
                  sx={{
                    '& fieldset': {
                      borderRadius: '18px',
                    },
                  }}
                  {...register('comment')}
                />
                <IconButton className="m-l-auto" type="submit">
                  <SendIcon color="primary" />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
        {commentData ? (
          <>
            {commentData.map(comment => (
              <Comment key={comment._id} comment={comment} setComment={setCommentData} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeContextMenu}>
        <Link href={'/post/' + postData._id}>
          <MenuItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Sửa bài viết</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={onDeleteClicked}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Xóa bài viết</ListItemText>
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
    </Card >
  )
}

export default PostContainer
