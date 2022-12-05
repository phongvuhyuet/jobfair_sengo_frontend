import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import { CommentsService } from 'src/common/open-api'
import { toast } from 'react-toastify'
import { appLibrary } from 'src/common/utils/loading'

export default function Comment(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
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
  return (
    <div className="flex flex-row gap-[10px] my-[25px] mx-3">
      <Avatar>{props.comment.user.name.at(0)}</Avatar>
      <div className="flex items-center">
        <div className="content p-[12px] bg-[#f0f2f5] rounded-[18px]">{props.comment.content}</div>
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
          <MenuItem onClick={handleCloseMenu}>
            Chỉnh sửa<a href=""></a>
          </MenuItem>
          <MenuItem onClick={() => handleDeleteComment(props.comment._id)}>Xóa</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
