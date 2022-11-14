import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Pagination,
  Stack,
  TextField,
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CreateTopicDto, TopicRespDto, TopicsService } from 'src/common/open-api'
import { appLibrary } from 'src/common/utils/loading'
type FormInputs = {
  name: string
}

export interface IProps {
  id?: string
}

interface IEdit {
  open: boolean
  item: any
  onChange(open: boolean): void
  updateUi(id: string, topics: string): void
}
interface IDelete {
  open: boolean
  id: string
  onChange(open: boolean): void
  updateUI(topicId: string): void
}

const TopicEdit = ({ open, item, onChange, updateUi }: IEdit) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ criteriaMode: 'all' })

  useEffect(() => {
    reset()
  }, [item])

  const handleEdit = async (name: string) => {
    onChange(false)
    appLibrary.showloading()
    try {
      const { message } = await TopicsService.topics2({ id: item.id, body: { name: name } })
      console.log(message)
      if (message === 'Update Success') {
        toast.success('Cập nhật chủ đề thành công')
        updateUi(item.id, name)
      } else {
        toast.error('Cập nhật chủ đề thất bại')
      }
      reset()
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      toast.error('Cập nhật chủ đề thất bại')
      appLibrary.hideloading()
    }
  }

  useEffect(() => {
    setError('name', {
      types: {
        pattern: 'Tên chủ đề cần 6-60 ký tự, bao gồm ký tự chữ và không chứa ký tự đặc biệt',
      },
    })
  }, [setValue])

  const onEdit = data => {
    const { name } = data
    handleEdit(name)
  }

  return (
    <Dialog
      fullWidth
      onClose={() => {
        onChange(false)
      }}
      open={open}
    >
      <DialogTitle>Chỉnh sửa</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onEdit)}>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              required
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={item.name}
              error={errors.name ? true : false}
              helperText={
                errors.name ? 'Tên chủ đề cần 6-60 ký tự, bao gồm ký tự chữ và không chứa ký tự đặc biệt' : null
              }
              {...register('name', {
                pattern: /(?=.*[a-zA-Z])(?=^(?:(?![`*!@#$%^&*()_\-=+><,.?/\\|\[\]~:;'"]).)*$).{6,60}/,
                maxLength: 60,
                minLength: 6,
              })}
            />
          </FormControl>
          <DialogActions>
            <Button variant="contained" type="submit" color="primary" className="w-1/3 !text-white self-center">
              Sửa
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onChange(false)
              }}
              color="secondary"
              className="w-1/3 text-white self-center"
            >
              Hủy
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const DeleteConfirm = ({ open, id, onChange, updateUI }: IDelete) => {
  const handleDeleteTopic = async (deleteId: string) => {
    onChange(false)
    appLibrary.showloading()
    try {
      const { message } = await TopicsService.topics3({ id: deleteId })
      if (message === 'Delete Success') {
        toast.success('Xóa chủ đề thành công')
        appLibrary.hideloading()
        updateUI(deleteId)
      }
    } catch (error) {
      console.log(error)
      toast.error('Chủ đề này đã có bài viết, không thể xóa')
      appLibrary.hideloading()
    }
  }

  const onDelete = () => {
    handleDeleteTopic(id)
  }

  return (
    <Dialog open={open} keepMounted>
      <DialogTitle>Bạn có chắc muốn xóa</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            onDelete()
          }}
          color="primary"
          className="w-1/3 !text-white self-center"
        >
          Xóa
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onChange(false)
          }}
          color="secondary"
          className="w-1/3 text-white self-center"
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const TopicContainer = (): JSX.Element => {
  const [topics, setTopics] = useState<TopicRespDto[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [editItem, setEditItem] = useState({})
  const [deleteItem, setdeleteItem] = useState<string>()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({ criteriaMode: 'all' })

  const updateTopics = (id: string, name: string) => {
    var newArray = [...topics]

    topics.map(item => {
      if (item._id === id) {
        item.name = name
      }
    })

    setTopics(newArray)
  }

  const deleteTopics = (id: string) => {
    setTopics(prev => prev.filter(item => item._id != id))
  }

  function CustomPagination() {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    )
  }

  const getTopicsData = async () => {
    appLibrary.showloading()
    try {
      var res = await TopicsService.topics1()
      if (!res) return
      res.map(item => {
        item['id'] = item['_id']
      })
      setTopics(res.reverse())
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      appLibrary.hideloading()
    }
  }

  useEffect(() => {
    getTopicsData()
  }, [])

  const handleCreateTopic = async (name: CreateTopicDto) => {
    var newArray = [...topics]

    appLibrary.showloading()
    try {
      const data = await TopicsService.topics({ body: name })
      console.log(data)
      if (data) {
        const temp: TopicRespDto = data
        newArray.unshift(temp)
        newArray[0]['id'] = newArray[0]['_id']
        toast.success('Tạo chủ đề thành công')
        setTopics(newArray)
        appLibrary.hideloading()
        return
      }
      toast.error('Tạo chủ đề thất bại')
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      toast.error('Tạo chủ đề thất bại')
      appLibrary.hideloading()
    }
  }

  const onSubmit = (data: FormInputs) => {
    setError('name', {
      types: {
        pattern: 'Tên chủ đề cần 6-60 ký tự, bao gồm ký tự chữ và không chứa ký tự đặc biệt',
      },
    })
    console.log(data)
    const { name } = data
    reset()
    handleCreateTopic({ name: name })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Chủ đề', flex: 2 },
    {
      field: 'action',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      renderCell: params => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                setEditItem({ id: params.id, name: params.row.name })
                setOpenEdit(true)
              }}
            >
              Sửa
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                setdeleteItem(params.id.toString())
                setOpenDelete(true)
              }}
            >
              Xóa
            </Button>
          </Stack>
        )
      },
    },
  ]

  return (
    <>
      <TopicEdit
        open={openEdit}
        item={editItem}
        onChange={value => {
          setOpenEdit(value)
        }}
        updateUi={updateTopics}
      />
      <DeleteConfirm
        open={openDelete}
        onChange={value => {
          setOpenDelete(value)
        }}
        id={deleteItem ? deleteItem : ''}
        updateUI={deleteTopics}
      />
      <div className="flex flex-col justify-center items-center">
        <h1>Tạo chủ đề mới</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-10 justify-start">
            <div className="flex flex-row items-center justify-between gap-10">
              <FormControl sx={{ width: 300 }}>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={
                    errors.name ? 'Tên chủ đề cần 6-60 ký tự, bao gồm ký tự chữ và không chứa ký tự đặc biệt' : null
                  }
                  size="small"
                  {...register('name', {
                    pattern: /(?=.*[a-zA-Z])(?=^(?:(?![`*!@#$%^&*()_\-=+><,.?/\\|\[\]~:;'"]).)*$).{6,60}/,
                    maxLength: 60,
                    minLength: 6,
                  })}
                />
              </FormControl>
            </div>
            <FormControl>
              <Button variant="contained" type="submit" className="w-full !text-white self-center !px-10">
                Tạo
              </Button>
            </FormControl>
          </div>
        </form>
        <div className="h-[500px] lg:min-w-[30%] md:min-w-[80%] min-w-[90%] m-10">
          <DataGrid
            disableSelectionOnClick
            columns={columns}
            rows={topics ? topics : []}
            pageSize={7}
            rowsPerPageOptions={[5]}
            components={{
              Pagination: CustomPagination,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TopicContainer
