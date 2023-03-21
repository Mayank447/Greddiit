import {Link} from 'react-router-dom';

export default function LoginNavbar() {
    return(
        <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">GREDDIIT</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow"></div>
        </div>
            <div>
            <Link to='/login' className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 float-right">Login</Link>
            </div>
        </nav>
    )
}