import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./postSlice";
import { useEffect } from "react";


const PostView = () => {
    const {posts,isLoading,error} = useSelector((state) => state.postsR)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPost());
    },[])
    return (
        <div>
            All Posts
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {
                posts.length > 0 && posts?.map(post => {
                    return <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                })
            }
        </div>
    );
};

export default PostView;