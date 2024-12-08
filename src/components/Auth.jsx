import { login, logout } from "../services/authService"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut({ user }) {
  return (
    <div>
      Hello, {user.displayName || user.email}!
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}