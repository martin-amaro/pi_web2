import { auth } from "@/auth"

export const Test = async () => {
    const session = await auth()
    return (
        <div>
            {!session ? 'No sesión' : 'YES sesión'}
        </div>
    )
}