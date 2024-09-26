import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="p-4 px-8 bg-purple-950 flex justify-between items-center">
         <h1 className="text-2xl text-white font-bold">Dashboard</h1>
         <button className="bg-white shadow-md px-4 py-2 text-purple-900 rounded-md font-bold hover:bg-gray-100" onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="card m-8 p-4 border shadow-lg">
        <h1 className="text-3xl text-purple-800 py-2">Welcome,John Doe!</h1>
        <p className="text-purple-950 py-2"><span className="font-bold">Email:</span> xxxxxx@xxxx.com</p>
      </div>
    </div>
  )
}

export default Dashboard
