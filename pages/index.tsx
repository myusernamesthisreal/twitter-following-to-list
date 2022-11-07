import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Home() {
  const session = useSession()

  useEffect(() => {
    console.log(session);
  }, [session])
  return (
    <>
      <div>Hello World!</div>
      {session.status === "authenticated" ? null : <button onClick={() => signIn("twitter")}>Login with Twitter</button>}
    </>
  )
}
