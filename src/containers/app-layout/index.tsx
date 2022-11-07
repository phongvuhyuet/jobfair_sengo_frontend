import Navbar from "./navbar"

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <main>{children}</main>
      </div>
    </>
  )
}
