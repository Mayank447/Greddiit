import { useNavigate, Link } from "react-router-dom"
//import AssistantPhotoSharpIcon from '@mui/icons-material/AssistantPhotoSharp';
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import AutoAwesomeMotionSharpIcon from '@mui/icons-material/AutoAwesomeMotionSharp';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';
import SearchBar from "./SearchBar";

export default function SearchNavbar() {
    const navigate=useNavigate();
    const Logout=()=>{
        localStorage.setItem("status","false")
        localStorage.removeItem("x-auth-token")

        sessionStorage.setItem("mysubgreddiit-status","false") //List
        sessionStorage.removeItem("mysubgreddiit") 

        sessionStorage.setItem("subgreddiit-status","false") //My own Greddiit
        sessionStorage.removeItem("subgreddiit") 

        sessionStorage.setItem("subGreddiit-id-status","false") //Someones Greddiit
        sessionStorage.removeItem("subGreddiit-id") 

        localStorage.setItem("profile-status",false)
        localStorage.removeItem("profile")
        navigate("/")
    }

    return(
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">GREDDIIT</span>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white-200 border-teal-400 hover:text-teal hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <Link to='/mySubGreddiit' className="block mt-3 lg:inline-block lg:mt-0 text-white-400 hover:text-teal mr-3">
                <AutoStoriesSharpIcon />{'  My SubGreddiits'}
                </Link>
                <Link to='/greddiits' className="block mt-3 lg:inline-block lg:mt-0 text-white-400 hover:text-teal mr-1">
                <AutoAwesomeMotionSharpIcon /> {'  Sub-Greddiits'} 
                </Link>
                <Link to='/savedPosts' className="block mt-3 lg:inline-block lg:mt-0 text-white-400 hover:text-teal mr-7">
                <BookmarkAddedSharpIcon/ >{'  Saved Posts'}
                </Link>
                <div className="block mt-3 lg:inline-block lg:mt-0 text-white-400 hover:text-teal">
                    <SearchBar />
                </div>
            </div>
            <div>
            <Link to='/profilepage'><button type="button" className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">My Profile</button></Link>
            <button onClick={Logout} type="button" className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
            </div>
        </div>
        </nav>
    )
}