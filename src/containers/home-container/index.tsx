import styles from './Home.module.css'
import Slider from '@mui/material/Slider'
import useBearStore from './store'
import { useEffect } from 'react'
// import { HealthzService } from '../../common/open-api/swagger.gen'

const HomeContainer = (): JSX.Element => {
  const bears = useBearStore(state => state.bears)
  const increase = useBearStore(state => state.increase)
  // useEffect(() => {
  //   HealthzService.healthz().then(resp => {
  //     console.log(resp)
  //   })
  // }, [])
  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline">{bears}</h1>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="text-teal-600" />
      <button
        onClick={() => {
          increase(3)
        }}
      >
        add bears
      </button>
    </div>
  )
}

export default HomeContainer
