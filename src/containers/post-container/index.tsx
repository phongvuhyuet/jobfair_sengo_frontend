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
import { CreatePostDto, TopicRespDto, PostsService, TopicsService, UpdatePostDto } from 'src/common/open-api'
import Markdown from 'src/components/markdown'
import { useRouter } from 'next/router'
import { appLibrary } from 'src/common/utils/loading'

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
  const [listTopics, setListTopics] = useState<TopicRespDto[]>([])
  const [topic, setTopic] = useState('')
  const getListTopics = async () => {
    try {
      await TopicsService.topics1().then(resp => {
        setListTopics(resp)
      })
    } catch (error) {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
    }
  }
  const getPostData = async id => {
    try {
      await PostsService.posts4({ id: id }).then(resp => {
        setTitle(resp.title || '')
        setContent(resp.content || '')
        setTopic(resp.topic?._id || '')
      })
    } catch (error) {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
    }
  }
  useEffect(() => {
    getListTopics()
    if (id) {
      getPostData(id)
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
        appLibrary.hideloading()
        setMessage(prev => ({ ...prev, open: true, type: 'success', content: 'Cập nhật post thành công' }))
        router.push('/post/view/' + id)
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
        appLibrary.hideloading()
        setMessage(prev => ({ ...prev, open: true, type: 'success', content: 'Tạo post thành công' }))
        router.push('/post/view/' + resp._id)
      })
    } catch (error) {
      setMessage(prev => ({ ...prev, open: true, type: 'error', content: 'Đã có lỗi xảy ra' }))
    }
  }

  const onSubmit = data => {
    if (content && title && topic) {
      appLibrary.showloading()
      if (id) {
        handleUpdatePost(id, {
          title: title,
          content: content,
          topic_id: topic,
        })
      } else {
        handleCreatePost({
          title: title,
          content: content,
          topic_id: topic,
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
                <Typography variant="body2">
                  Tiêu đề <span className="text-red-600 text-sm">*</span>
                </Typography>
              </FormControl>
              <FormControl sx={{ width: 300 }}>
                <TextField
                  required
                  variant="outlined"
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
                <Typography variant="body2">
                  Chủ đề <span className="text-red-600 text-sm">*</span>
                </Typography>
              </FormControl>
              <FormControl size="small" sx={{ width: 300 }}>
                <Select
                  required
                  value={topic}
                  color="primary"
                  variant="outlined"
                  {...register('topic')}
                  onChange={e => {
                    setTopic(e.target.value)
                  }}
                >
                  {listTopics.map(topic => (
                    <MenuItem key={topic._id} value={topic._id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[10px]">
            <FormControl>
              <Typography variant="body2">
                Nội dung <span className="text-red-600 text-sm">*</span>
              </Typography>
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
          <div className="flex flex-row flex-end justify-end">
            <Button
              variant="outlined"
              type="button"
              className="w-[110px] xl:w-[130px] mr-2 text-[#6c757d] border-[#6c757d] self-center"
              onClick={() => {
                router.push('/post')
              }}
            >
              Hủy
            </Button>
            <Button variant="contained" type="submit" className="w-[110px] xl:w-[130px] ml-2 text-white self-center">
              {id ? 'Cập nhật' : 'Tạo'}
            </Button>
          </div>
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
