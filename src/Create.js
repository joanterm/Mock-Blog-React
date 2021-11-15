import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("Joanna")
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()


    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeBody = (e) => {
        setBody(e.target.value)
    }

    const changeAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const newBlogEntry = {title, body, author}
        setIsPending(true)

        console.log(newBlogEntry)
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBlogEntry)
        })
        .then(() => {
            console.log("new blog added")
            setIsPending(false)
            history.push("/")
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={submitForm}>
                <label>Blog Title:</label>
                    <input required type="text" value={title} onChange={changeTitle}/>
                <label>Blog Body:</label>
                    <textarea required value={body} onChange={changeBody}></textarea>
                <label>Blog Author:</label>
                    <select value={author} onChange={changeAuthor}>
                        <option value="Joanna">Joanna</option>
                        <option value="Laura">Laura</option>
                    </select>
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}

export default Create;