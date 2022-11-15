import MetaData from './metadata'
import Navbar from './navbar'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <MetaData />
      <div>
        <Navbar></Navbar>
        <div className="mt-[160px] px-[24px]">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
