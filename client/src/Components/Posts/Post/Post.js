import React, {useEffect, useState} from 'react';
import Code from "../../Code";
import {Button} from "@mui/material";

const Post = ({posts, getPosts, addPost, delPost}) => {
    const [isCreate, setIsCreate] = useState(false)
    const [title, setTitle] = useState('')
    const [userCode, setUserCode] = useState('')
    const [userText, setUserText] = useState('')

    useEffect(() => {
        getPosts()
    }, [posts.length])

    const addQuestion = () => {
        addPost(title, userText, userCode)
        setIsCreate(false)
    }

    return (
        <div style={{textAlign: "center"}}>
            {isCreate
                ? <div>
                    <div><input onChange={e => setTitle(e.target.value)} placeholder={'Post title...'} value={title}/></div>
                    <div><textarea onChange={e => setUserCode(e.target.value)} placeholder={'Your code...'} value={userCode}/></div>
                    <div><textarea onChange={e => setUserText(e.target.value)} placeholder={'Your text...'} value={userText}/></div>
                    <button onClick={addQuestion}>Add question</button>
                </div>
                : <div>
                    <Button variant="contained" onClick={() => getPosts()} color={'success'}>Get Posts</Button>
                    <button onClick={() => setIsCreate(true)}>Create Post</button>
                    {posts.map(post =>
                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <div>{post.body}</div>
                        <Code code={post.code}/>
                        <button onClick={() => delPost(post._id)}>Delete Post</button>
                    </div>)}
                </div>
                }
        </div>
    );
};

export default React.memo(Post);