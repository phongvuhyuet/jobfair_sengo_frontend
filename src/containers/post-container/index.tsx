import {
  Alert,
  AlertColor,
  Button,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreatePostDto, PostsService, UpdatePostDto } from 'src/common/open-api'
import Markdown from 'src/components/markdown'
import { useRouter } from 'next/router'

export interface IProps {
  id?: string
}

const PostContainer = ({ id }: IProps): JSX.Element => {
  const router = useRouter()
  const [message, setMessage] = useState({
    type: 'success',
    content: '',
    open: false,
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    if (id) {
      try {
        PostsService.posts4({ id: id }).then(resp => {
          console.log(resp)
          setTitle(resp.title || '')
          setContent(resp.content || '')
        })
      } catch (error) {
        setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
      }
    }
  }, [id])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage(prev => ({ ...prev, open: false }))
  }
  const handleUpdatePost = (id, body: UpdatePostDto) => {
    try {
      PostsService.posts2({
        id: id,
        body: body,
      }).then(resp => {
        setMessage(prev => ({ ...prev, open: true, type: 'success', content: 'Cập nhật post thành công' }))
      })
    } catch (error) {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
    }
  }
  const resetForm = () => {
    setTitle('')
    setContent('')
  }
  const handleCreatePost = (body: CreatePostDto) => {
    try {
      PostsService.posts({
        body: body,
      }).then(resp => {
        setMessage(prev => ({ ...prev, open: true, type: 'success', content: 'Tạo post thành công' }))
        resetForm()
      })
    } catch (error) {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
    }
  }
  const onSubmit = data => {
    if (content && title && data.topic) {
      if (id) {
        handleUpdatePost(id, {
          title: title,
          content: content,
        })
      } else {
        handleCreatePost({
          title: title,
          content: content,
        })
      }
    } else {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Thông tin post điền chưa đủ' }))
    }
  }
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-row items-center gap-[50px] flex-wrap">
            <div className="flex flex-row items-center justify-between gap-10">
              <FormControl>
                <Typography variant="body2">Tiêu đề</Typography>
              </FormControl>
              <FormControl>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  focused
                  size="small"
                  {...register('title')}
                  value={title}
                  onChange={event => {
                    setTitle(event.target.value)
                  }}
                />
              </FormControl>
            </div>
            <div className="flex flex-row items-center gap-10">
              <FormControl>
                <Typography variant="body2">Chủ đề</Typography>
              </FormControl>
              <FormControl size="small" focused required>
                <Select required defaultValue={1} color="primary" variant="outlined" {...register('topic')}>
                  <MenuItem value={1}>Ten</MenuItem>
                  <MenuItem value={2}>Twenty</MenuItem>
                  <MenuItem value={3}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[10px]">
            <FormControl>
              <Typography variant="body2">Nội dung</Typography>
            </FormControl>
            <div>
              <Markdown type="post" content={content} setContent={setContent}></Markdown>
              <FormControl>
                <Button variant="outlined" component="label" size="small">
                  Đính kèm tệp
                  <input hidden accept="image/*" type="file" />
                </Button>
              </FormControl>
            </div>
          </div>

          <Button variant="contained" type="submit" className="w-1/5 text-white self-center">
            {id ? 'Cập nhật' : 'Tạo'}
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={message.open}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={(message.type as AlertColor) || undefined}
          sx={{ width: '100%' }}
        >
          {message.content}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default PostContainer
