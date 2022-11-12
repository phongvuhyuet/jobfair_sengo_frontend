import { Box, Card, Divider } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TopicsService, TopicWithPostCountDto } from 'src/common/open-api'

export default function Complementary() {
  const [listTopic, setListTopic] = useState([] as TopicWithPostCountDto[])
  useEffect(() => {
    try {
      TopicsService.withPostCount({ topicCount: '5' }).then(resp => {
        setListTopic(resp)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <Box sx={{ boxShadow: 3 }}>
      <Card className="h-[820px] overflow-scroll">
        <div className="max-h-[250px] flex flex-col items-center mb-[20px]">
          <h3>Chủ đề </h3>
          <div className="w-full flex flex-col px-2 px-[30px]">
            <ul className="list-none">
              {listTopic.map(topic => (
                <Link key={topic._id} href={'/post/topic/' + topic._id}>
                  <li className="w-full p-[10px] hover:bg-slate-300 hover:cursor-pointer">{topic.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center mb-[20px]">
          <h3>Online</h3>
          <div className="w-full flex flex-col px-2 px-[30px]">
            <ul className="list-none">
              <li className="w-full p-[10px] flex items-center hover:bg-slate-200 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Trịnh Mai Huy</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Nguyễn Văn Quỳnh</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Đỗ Tiến Đạt</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Lê Tuấn Hùng</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Vũ Quế Lâm</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Vũ Quế Lâm</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Vũ Quế Lâm</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Vũ Quế Lâm</p>
              </li>
              <li className="w-full p-[10px] flex items-center hover:bg-slate-300 hover:cursor-pointer">
                <CircleIcon sx={{ color: 'green', width: 10, height: 10 }} />
                <p className="ml-2">Vũ Quế Lâm</p>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </Box>
  )
}
