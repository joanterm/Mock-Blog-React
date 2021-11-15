import { Link } from "react-router-dom"

const PageNotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>  
            <p>This page cannotbe found</p>
            <Link to="/">Back to the homepage...</Link>
        </div>
     );
}
 
export default PageNotFound;