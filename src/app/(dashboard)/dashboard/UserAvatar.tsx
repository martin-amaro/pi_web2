import type { Session } from "next-auth"
 
export function UserAvatar({ session }: { session: Session | null }) {
  return (
    <div>
      {session?.user?.name}
    </div>
  )
}