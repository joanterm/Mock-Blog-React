import {useState, useEffect} from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)


    // const handleDelete = (e) => {
    //     const newBlogs = blogs.filter((element) => (
    //         element.id !== e
    //         // true if doesnt match (keep it)
    //         // false if matches (remove it)
    //     ))
    //     setBlogs(newBlogs)
    // }

    useEffect(() => {
        fetch("http://localhost:8000/blogsss")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Could not fetch data")
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setBlogs(data)
            setIsLoading(false) //once data gets fetched, it will remove loading massage
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            setIsLoading(false)
            setError(null)
        })
    }, []);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <p>Loading...</p>}
            {/* blogs && -> if it's true it will read the right side of it */}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
            {/* <BlogList blogs={blogs.filter((element) => (
                element.author === "joanna"
            ))} title="Joanna's Blogs" handleDelete={handleDelete}/> */}
        </div>
     );
}
 
export default Home;

