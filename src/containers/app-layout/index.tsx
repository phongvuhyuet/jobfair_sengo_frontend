export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <div>
        <h1>Sengo</h1>
        <hr />
        <main>{children}</main>
      </div>
    </>
  )
}
