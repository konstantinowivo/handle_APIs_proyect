import React from "react";
import AddPost from "./AddPost_component/AddPost";
import Post from "./Post_component/Post";
import RecipeReviewCard from "./Material_component/Card_component";
import { useState } from "react";
import { useEffect } from "react";

export default function App(){

    const [posts, setPosts] = useState([]);

    const fetchPosts = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
    const data = await response.json();
    setPosts(data);
    }

    useEffect(() => {
        fetchPosts()
    }, []);


    const addPost = async(title, body) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: Math.random().toString(36).slice(2),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    setPosts((prevPosts) => [data, ...prevPosts])
    };

    const deletePost = async(id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
        if(response.status === 200) {
        setPosts(
            posts.filter((post) => {
            return post.id !== id;
            })
        )
        }
    };

    return (
    <main>
    <h1>App para consumir API Rest</h1>
        <AddPost addPost={addPost}/>
        <section className="posts-container">
        <h2>Posteos</h2>
        {posts.map((post) => 
            <Post 
            key={post.id} 
            id={post.id}
            title={post.title} 
            body={post.body} 
            deletePost={deletePost}
            />
        )}
        </section>
        <RecipeReviewCard />
    </main>
    )
}