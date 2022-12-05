import { Avatar, Button, FormControl, IconButton, Menu, MenuItem, TextField } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React, { useState } from 'react'
import { CommentsService } from 'src/common/open-api'
import { toast } from 'react-toastify'
import { appLibrary } from 'src/common/utils/loading'
import SendIcon from '@mui/icons-material/Send'
import { useForm } from 'react-hook-form'
type FormInputs = {
  comment: string
}

export default function Comment(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [edit, setEdit] = useState(false)
  const [comment, setComment] = useState(props.comment.content)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({ criteriaMode: 'all' })

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleDeleteComment = commentId => {
    appLibrary.showloading()
    setAnchorEl(null)
    try {
      CommentsService.comments3({ id: commentId }).then(resp => {
        console.log(resp)
        props.setComment(prev => {
          return [...prev.filter(item => item._id !== commentId)]
        })
        appLibrary.hideloading()
        toast.success('Xoá comment thành công')
      })
    } catch (error) {
      console.log(error)
      toast.error('Xóa không thành công')
    }
  }

  const openEdit = () => {
    handleCloseMenu()
    setEdit(true)
  }

  const closeEdit = () => {
    reset()
    setEdit(false)
  }

  const onEdit = data => {
    const { comment } = data
    handleEdit(comment)
  }

  const handleEdit = async (comment: string) => {
    appLibrary.showloading()
    try {
      const { content } = await CommentsService.comments2({ id: props.comment._id, body: { content: comment } })
      if (content) {
        setComment(content)
      }
    } catch (error) {
      console.log(error)
    } finally {
      appLibrary.hideloading()
      setEdit(false)
    }
  }

  return edit ? (
    <div className="flex flex-row gap-[10px] my-[25px] mx-3">
      <Avatar>{props.comment.user.name.at(0)}</Avatar>
      <div className="flex flex-col w-full">
        <div>
          <form onSubmit={handleSubmit(onEdit)}>
            <div className="flex items-center w-full">
              <TextField
                placeholder="Viết bình luận"
                defaultValue={comment}
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
        <div>
          <Button size="small" onClick={closeEdit}>
            Hủy
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row gap-[10px] my-[25px] mx-3">
      <Avatar>{props.comment.user.name.at(0)}</Avatar>
      <div className="flex items-center">
        <div className="content p-[12px] bg-[#f0f2f5] rounded-[18px]">{comment}</div>
        <IconButton onClick={handleOpenMenu} className="m-l-auto">
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="menu-edit-comment"
          sx={{ marginLeft: 3 }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={openEdit}>
            Chỉnh sửa<a href=""></a>
          </MenuItem>
          <MenuItem onClick={() => handleDeleteComment(props.comment._id)}>Xóa</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
