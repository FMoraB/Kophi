import { Link } from "react-router-dom"
import kophiLogo from "../assets/kophi.png"
import userRound from "../assets/user-round.png"

function NavBar() {
    return (
        <nav className="bg-background/80 fixed w-full z-50 top-0 border-b border-border border-b-[#949494] backdrop-blur-md transition-colors duration-300">
            {/*Main elements container*/}
            <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4 px-8">
                {/*Logo container*/}
                <div className="flex flex-wrap">
                    <a href="/" className="flex flex-wrap items-center gap-4">
                        <img src={kophiLogo} alt="Kophi Logo" className="h-8 w-auto object-contain" />
                        <span className='text-[#3F75FF] font-extrabold font-sans'>Kophi</span>
                    </a>
                </div>
                {/*Pages container*/}
                <div className="flex flex-wrap items-center">
                    <ul className="flex flex-wrap gap-11">
                        <li>
                            <a href="/" className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="/" className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">Community</a>
                        </li>
                        <li>

                            <a href="/" className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">Popular</a>
                        </li>
                        <li>
                            <Link to='/chat'>
                                <a className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">Chat</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ml-7 flex items-center">
                        <a href="/" className="flex flex-wrap items-center">
                            <img src={userRound} alt="User Profile" className="h-8 w-8 object-contain" />
                        </a>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default NavBar

