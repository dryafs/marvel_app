import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>There is no page, that you are looking for</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Home Page</Link>
        </div>
    )
}

export default Page404