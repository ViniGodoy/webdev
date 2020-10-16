import React from "react";
import WrittenBy from "../WrittenBy";
function Post(props) {
    const post = props.data;

    return (
        <article>
            <h1>{post.title}</h1>
            <WrittenBy name={post.name} email={post.email} />
            {post.body}
        </article>
    );
}

export default Post;