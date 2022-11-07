import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Stack, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateTopicDto, TopicRespDto, TopicsService } from 'src/common/open-api'
import { appLibrary } from 'src/common/utils/loading'

export interface IProps {
  id?: string
}

interface IEdit {
  open: boolean
  item: any
  onChange(open: boolean): void
  setLoad(load: boolean): void
}
interface IDelete {
  open: boolean
  id: string
  onChange(open: boolean): void
  setLoad(load: boolean): void
}

const TopicEdit = ({ open, item, onChange, setLoad }: IEdit) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    reset()
  }, [item])

  const handleEdit = async (name: string) => {
    onChange(false)
    appLibrary.showloading()
    setLoad(true)
    try {
      const res = await TopicsService.topics2({ id: item.id, body: { name: name } })
      console.log(res)
      reset()
      setLoad(false)
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      setLoad(false)
      appLibrary.hideloading()
    }
  }

  const onEdit = data => {
    console.log(data)
    const { name } = data
    handleEdit(name)
  }

  return (
    <Dialog
      onClose={() => {
        onChange(false)
      }}
      open={open}
    >
      <DialogTitle>Chỉnh sửa</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onEdit)}>
          <FormControl>
            <TextField
              margin="dense"
              required
              variant="outlined"
              fullWidth
              focused
              size="small"
              defaultValue={item.name}
              {...register('name')}
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

const DeleteConfirm = ({ open, id, onChange, setLoad }: IDelete) => {
  const handleDeleteTopic = async (deleteId: string) => {
    onChange(false)
    appLibrary.showloading()
    setLoad(true)
    try {
      const res = await TopicsService.topics3({ id: deleteId })
      console.log(res)
      setLoad(false)
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      setLoad(false)
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
  const [loadingOver, setLoadingOver] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [editItem, setEditItem] = useState({})
  const [deleteItem, setdeleteItem] = useState<string>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const getTopicsData = async () => {
    appLibrary.showloading()
    try {
      const res = await TopicsService.topics1()
      if (!res) return
      res.map(item => {
        item['id'] = item['_id']
        delete item['_id']
      })
      setTopics(res)
      appLibrary.hideloading()
    } catch (error) {
      console.log(error)
      appLibrary.hideloading()
    }
  }

  useEffect(() => {
    getTopicsData()
  }, [loadingOver])

  const handleCreateTopic = async (name: CreateTopicDto) => {
    setLoadingOver(true)
    try {
      const { message } = await TopicsService.topics({ body: name })
      if (message === 'Create success') {
        console.log('Tao thanh cong')
        setLoadingOver(false)
        return
      }
      console.log('Tao that bai')
    } catch (error) {
      console.log(error)
      setLoadingOver(false)
    }
  }

  const onSubmit = data => {
    const { name } = data
    reset()
    handleCreateTopic({ name: name })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Chủ đề', flex: 5 },
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
        setLoad={value => {
          setLoadingOver(value)
        }}
      />
      <DeleteConfirm
        open={openDelete}
        onChange={value => {
          setOpenDelete(value)
        }}
        id={deleteItem ? deleteItem : ''}
        setLoad={value => {
          setLoadingOver(value)
        }}
      />
      <div className="flex flex-col justify-center items-center">
        <h1>Tạo chủ đề mới</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-10">
            <div className="flex flex-row items-center justify-between gap-10">
              <FormControl sx={{ width: 300 }}>
                <TextField required variant="outlined" fullWidth size="small" {...register('name')} />
              </FormControl>
            </div>

            <Button variant="contained" type="submit" className="w-1/3 !text-white self-center">
              Tạo
            </Button>
          </div>
        </form>
        <div className="h-[500px] w-[90%] m-10">
          <DataGrid
            disableSelectionOnClick
            columns={columns}
            rows={topics ? topics : []}
            pageSize={7}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </>
  )
}

export default TopicContainer
