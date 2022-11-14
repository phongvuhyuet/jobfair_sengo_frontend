import { Button } from '@mui/material'
import Link from 'next/link'
import { TopicRespDto } from 'src/common/open-api'

export default function TagItem({ topic } : { topic: TopicRespDto}) {
  return (
    <Button variant="outlined" type="button" className="normal-case p-1 py-0">
      <Link href={"/topic/" + topic._id}>
        <a>{topic.name}</a>
      </Link>
    </Button>
  )
}
