import { Link, NavLink, Outlet} from "react-router-dom"

const sections = [1, 2, 3, 4, 5]

export default function Sections() {
    return(
        <div>
            {sections.map((section) => (
                <NavLink key={section} to={`${section}`} className={({isActive}) => {
                    return isActive ? 'text-red-500' : ''
                }}>
                    Section: {section}
                </NavLink>
            ))}
        <Outlet></Outlet>
        </div>
    
    )
}
