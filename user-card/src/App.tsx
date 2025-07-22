import { UserCard } from "./_components/UserCard"

function App() {
  return (
    <div className="p-6">
      <UserCard
        name="Putra Dev"
        email="putra@example.com"
        isActive={true}
      />
    </div>
  )
}

export default App
