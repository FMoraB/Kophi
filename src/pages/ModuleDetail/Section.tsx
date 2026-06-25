import { useParams, useLoaderData} from "react-router-dom"
import type { LoaderFunctionArgs } from "react-router-dom";


export default function Section() {

    const params = useParams<{sectionId: string}>();

    return(
        <div>
            <p> Number: {params.sectionId}</p>
        </div>
       
    )
}


