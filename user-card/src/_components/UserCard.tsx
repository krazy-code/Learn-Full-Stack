type Props = {
  name: string
  email: string
  isActive: boolean
}

export const UserCard = ({ name, email, isActive }: Props) => {
  return (
    <div className="p-4 border rounded-xl shadow-md max-w-sm">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{email}</p>
      <p className={isActive ? "text-green-500" : "text-red-500"}>
        {isActive ? "Active" : "Inactive"}
      </p>
    </div>
  )
}