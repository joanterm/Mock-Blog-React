import { useHistory, useParams } from "react-router-dom";
import {useState, useEffect} from "react";


//WE WILL BE REUSING MOST OF THE SAME FETCH REQEST, TO MAKE IT MORE DRY, WE CAN CREATE
//OUR OWN CUSTOM HOOK THAT WILL STORE GENERAL FETCH INFORMATION
const BlogDetails = () => {
    const {id} = useParams()
    const [blogs, setBlogs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const history = useHistory()
 
    useEffect(() => {
        fetch("http://localhost:8000/blogs/" + id) //part of abort error
        .then((response) => {
            if (!response.ok) {
                throw Error(`Error getting the data. Your error code is: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setBlogs(data) 
            setIsLoading(false) //once data gets fetched, it will remove loading massage
            setError(null)
        })
        .catch((err) => {
                console.log(err.message)
                setError(err.message)
                setIsLoading(false)
        })
    }, [id]);

    const deletePost = () => {
        fetch("http://localhost:8000/blogs/" + id, {
            method: "DELETE"
        })
        .then(() => {
            history.push("/")
        })
    }

    return ( 
        <div className="blog-details">
            <h2>Blog Details - {id}</h2>
            {error && <div>{error}</div>}
            {isLoading && <p>Loading...</p>}
            {blogs && (
                <article>{blogs.title}
                <p>Witten by: {blogs.author}</p>
                <div>
                    {blogs.body}
                </div>
                <button onClick={deletePost}>Delete</button>
                </article>

            )}
        </div>
     );
}
 
export default BlogDetails;