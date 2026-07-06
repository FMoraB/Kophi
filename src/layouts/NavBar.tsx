import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import kophiLogo from "../assets/kophi.png"
import userRound from "../assets/user-round.png"
import { getUser } from "../types/user"

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const activeUser = getUser();

    const link = activeUser ? `/profile` : "/login";
    const linkCreate = activeUser ? `/create-module` : "/login";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <nav className="bg-background/80 fixed w-full z-50 top-0 border-b border-border border-b-[#949494] backdrop-blur-md transition-colors duration-300">
            {/*Main elements container*/}
            <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4 px-8">
                {/*Logo container*/}
                <div className="flex items-center">
                    <a href="/" className="flex items-center gap-4">
                        <img src={kophiLogo} alt="Kophi Logo" className="h-8 w-auto object-contain" />
                        <span className='text-[#3F75FF] font-extrabold font-sans'>Kophi</span>
                    </a>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-gray-700 hover:text-[#3F75FF] focus:outline-none transition-colors">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/*Pages container - Desktop*/}
                <div className="hidden md:flex items-center">
                    <ul className="flex gap-11">
                        <li>
                            <a href="/" className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">Home</a>
                        </li>
                        <li>
                            <Link to={linkCreate} className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link to='/popular' className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">
                                Popular
                            </Link>
                        </li>
                        <li>
                            <Link to='/chat' className="font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors">
                                Chat
                            </Link>
                        </li>
                    </ul>
                    <div className="ml-7 flex items-center">
                        <Link to={link}>
                            <img src={userRound} alt="User Profile" className="h-8 w-8 object-contain" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#f8f9fa]/95 backdrop-blur-md border-b border-gray-200">
                    <ul className="flex flex-col px-8 py-4 gap-4">
                        <li>
                            <a href="/" className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors" onClick={toggleMenu}>Home</a>
                        </li>
                        <li>
                            <Link to={linkCreate} className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors" onClick={toggleMenu}>
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link to='/popular' className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors" onClick={toggleMenu}>
                                Popular
                            </Link>
                        </li>
                        <li>
                            <Link to='/chat' className="block font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors" onClick={toggleMenu}>
                                Chat
                            </Link>
                        </li>
                        <li className="pt-2 border-t border-gray-200">
                            <Link to={link} className="flex items-center gap-2 font-semibold text-gray-700 hover:text-[#3F75FF] transition-colors" onClick={toggleMenu}>
                                <img src={userRound} alt="User Profile" className="h-6 w-6 object-contain" />
                                {activeUser ? 'Profile' : 'Login'}
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default NavBar
