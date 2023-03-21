/*function OldNavbar() {
  return (
    <div id="Navbar">
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
            <a href="/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Greddiit Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Greddiit</span>
            </a>
            <div className="flex items-center">
                <a href="tel:5541251234" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">My Profile</a>
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
            </div>
        </div>
    </nav>
    <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
                <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                    <li>
                        <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Sub Greddiit</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-900 dark:text-white hover:underline">My SubGreddiits</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-900 dark:text-white hover:underline">Saved Posts</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
  )
}*/

import { useNavigate, Link } from "react-router-dom"
//import AssistantPhotoSharpIcon from '@mui/icons-material/AssistantPhotoSharp';
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import AutoAwesomeMotionSharpIcon from '@mui/icons-material/AutoAwesomeMotionSharp';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';

export default function Navbar() {
    const navigate=useNavigate();
    const Logout=()=>{
        localStorage.setItem("status","false")
        localStorage.removeItem("x-auth-token")

        sessionStorage.setItem("mysubgreddiit-status","false")
        sessionStorage.removeItem("mysubgreddiit") //List

        sessionStorage.setItem("subgreddiit-status","false")
        sessionStorage.removeItem("subgreddiit") //My own Greddiit

        sessionStorage.setItem("subGreddiit-id-status","false")
        sessionStorage.removeItem("subGreddiit-id") //Someones Greddiit

        localStorage.setItem("profile-status",false)
        localStorage.removeItem("profile")
        navigate("/")
    }

    return(
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            {/* <img className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" src="GreddiitLogo.svg"></img> */}
            <span className="font-semibold text-xl tracking-tight">GREDDIIT</span>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white-200 border-teal-400 hover:text-teal hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <Link to='/mySubGreddiit' className="block mt-4 lg:inline-block lg:mt-0 text-white-400 hover:text-teal mr-4">
                <AutoStoriesSharpIcon />{'  My SubGreddiits'}
                </Link>
                <Link to='/greddiits' className="block mt-4 lg:inline-block lg:mt-0 text-white-400 hover:text-teal mr-4">
                <AutoAwesomeMotionSharpIcon /> {'  Sub-Greddiits'} 
                </Link>
                <Link to='/savedPosts' className="block mt-4 lg:inline-block lg:mt-0 text-white-400 hover:text-teal">
                <BookmarkAddedSharpIcon/ >{'  Saved Posts'}
                </Link>
            </div>
            <div>
            <Link to='/profilepage'><button type="button" className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">My Profile</button></Link>
            <button onClick={Logout} type="button" className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
            </div>
        </div>
        </nav>
    )
}