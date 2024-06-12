import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="header-links">
      <Link to='/'><i style={{ marginRight: 20, cursor: "pointer", fontSize: 25}} className="fa-solid fa-paw"></i></Link>
      <Link style={{ marginRight: 20 }} to='/'>Home</Link>
      <Link style={{ marginRight: 20 }} to='/login'>Login</Link>
      <Link style={{ marginRight: 20 }}to={'/ListingPage'}>Make Listing</Link>
      <Link to='/Profile'>Profile</Link>
      {/* <Link to='/MessagePage'>Message</Link> */}
      {/* <Link to='/GetMessages'>Get Message</Link> */}
    </div>
  )
}

export default Header