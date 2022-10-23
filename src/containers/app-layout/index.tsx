export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <div>
        <h1>layout</h1>
        <main>{children}</main>
      </div>
    </>
  )
}
