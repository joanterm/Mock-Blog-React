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
        //AbortController will prevent fetching in the background/errors when we switch to a different page
        const abortCont = new AbortController()

        fetch("http://localhost:8000/blogs", {signal: abortCont.signal}) //part of abort error
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
            if (err.name === "AbortError") { //it has to be equal to "AbortError"
            } else {
                console.log(err.message)
                setError(err.message)
                setIsLoading(false)
            }
        })
        return () => {
            abortCont.abort() //part of abort error
        }
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

// TO RUN A SERVER:
// npx json-server --watch data/db.json --port 8000

// API ENDPOINT FROM RESOURCES IN THE TERMINAL: 
// http://localhost:8000/blogs