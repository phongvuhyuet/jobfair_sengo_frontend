import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

export interface IProps {
  post?: any
}

const PostContainer = ({ post }: IProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = data => console.log(data)

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
                <TextField required variant="outlined" fullWidth focused size="small" {...register('title')} />
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

          <div className="flex flex-row items-center gap-[10px]">
            <FormControl>
              <Typography variant="body2">Nội dung</Typography>
            </FormControl>
            {/* Todo: Markdown */}
          </div>

          <FormControl>
            <Button variant="outlined" component="label" size="small" className="w-1/5">
              Tải tệp lên
              <input hidden accept="image/*" type="file" />
            </Button>
          </FormControl>

          <Button variant="contained" type="submit" className="w-1/5 text-white self-center">
            {post ? 'Cập nhật' : 'Tạo'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PostContainer
