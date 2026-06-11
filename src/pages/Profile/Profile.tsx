import { Link, useParams } from "react-router-dom"


export default function Profile() {
    const params = useParams<{userId: string}>();
    return(
        <div>
            <p>Profile ID: {params.userId}</p>
            <Link to="/">Home</Link>  
        </div>
        
    )
}
