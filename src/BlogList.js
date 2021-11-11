const BlogList  = (props) => {
    const blogs = props.blogs 
    const title = props.title

    // props.blogs is pulling it from Home.js component where it was defined
    // 
    // const BlogList  = ({blogs, title, hadnelDelete}) => {

    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
                    {blogs.map((element) => (
                <div className="blog-preview" key={element.id}>
                    <h2>{element.title}</h2>
                    <p>Written by: {element.author}</p>
    
                </div>
            ))}
        </div>
     );
}

export default BlogList;