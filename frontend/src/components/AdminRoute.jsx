import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const AdminRoute = () => {
    const {userInfo} = useSelector (state => state.auth)

    return userInfo && userInfo.isadmin? <Outlet/> :<Navigate to="/login" replace/>// replace is just to replace any past history
  return (
    <div>PrivateRoute</div>
  )
}

export default AdminRoute