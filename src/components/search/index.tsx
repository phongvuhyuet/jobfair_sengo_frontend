import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import { PostResponseDto, PostsService } from 'src/common/open-api'
import { InputAdornment } from '@mui/material'
export default function Search() {
  const router = useRouter()
  const [searchData, setSearchData] = React.useState('')
  const [suggestion, setSuggestion] = React.useState<PostResponseDto[]>([])

  React.useEffect(() => {
    setSuggestion([])
    if (router.query.post_title) {
      setSearchData(router.query.post_title.toString())
    } else {
      setSearchData('')
    }
  }, [router.query])
  const handleAutoCompleteChange = (_event, value, reason) => {
    if (reason === 'selectOption') {
      router.push('/post/view/' + value._id)
    } else if (reason === 'createOption') {
      router.push({
        pathname: '/search',
        query: { post_title: value },
      })
    }
  }
  const getDataSuggestion = async textSearch => {
    if (textSearch.length > 0) {
      try {
        await PostsService.filter({ title: textSearch }).then(resp => {
          setSuggestion(resp)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Autocomplete
      freeSolo
      id="free-solo-demo"
      blurOnSelect={true}
      clearOnBlur={true}
      options={suggestion}
      inputValue={searchData}
      onInputChange={(_event, value, reason) => {
        if (reason === 'reset' || reason == 'clear') {
          setSearchData('')
          setSuggestion([])
        } else if (reason === 'input') {
          setSearchData(value)
          getDataSuggestion(value)
        }
      }}
      getOptionLabel={(option: any) => (option.title ? option.title : '')}
      onChange={handleAutoCompleteChange}
      renderInput={params => (
        <TextField
          {...params}
          sx={{ width: 320 }}
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Tìm kiếm..."
        />
      )}
    />
  )
}
