import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostComponent() {
    const [state, setState] = useState({
        posts: [],
        id: "",
        userId: "",
        title: "",
        body: "",
        username: [],

    });

    // Post and User Uploaded in UI 
    useEffect(async () => {
        const posts = await getPosts();
        const username = await getUsers();
        setState({ ...state, posts, username });
    }, []);

    //Fetch data from API and update post using setState
    const getPosts = async () => {
        try {
            const { data } = await axios.get(API_URL);
            console.log("Posts", data);
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    //Display user name in select option
    const getUsers = async () => {
        try {
            var { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
            console.log("getusers", data);
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value });
    };

    //Create new Post and Push new Post to posts array
    const createPost = async () => {
        try {
            const { userId, title, body } = state;
            const { data } = await axios.post(API_URL, {
                userId,
                title,
                body,
            });
            const posts = [...state.posts];
            posts.push(data);
            setState({ ...state, posts, userId: "", title: "", body: "" });
        } catch (err) {
            console.error(err);
        }
    };

    //Delete post
    const deletePost = async (postId) => {
        try {
            await axios.delete(`${API_URL}/${postId}`);

            let posts = [...state.posts];
            posts = posts.filter(({ id }) => id !== postId);

            setState({ ...state, posts });
        } catch (err) {
            console.error(err);
        }
    };

    //Update Post
    const updatePost = async () => {
        try {
            const { id, userId, title, body, posts } = state;
            const { data } = await axios.put(`${API_URL}/${id}`, {
                userId,
                title,
                body,
            });
            const index = posts.findIndex((post) => post.id === id);
            posts[index] = data;

            setState({ ...state, posts, id: "", userId: "", title: "", body: "" });
        } catch (err) {
            console.log(err);
        }
    };

    //Display data in Input box
    const selectPost = (post) => setState({ ...state, ...post });

    // Display user ID in UserID input box
    const FetchID = (event) => {
        setState({ ...state, userId: event.target.value })
        console.log(event.target.value)
    }

    // Form submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted...");
        if (state.id) {
            updatePost();
        } else {
            createPost();
        }
    };

    const history = useHistory();

    return (
        <>
            {/* goBack and goForward Icons */}

            <i onClick={history.goBack} style={{ fontSize: "30px" }} className="fas fa-arrow-left"></i>
            <i onClick={history.goForward} style={{ float: "right", fontSize: "30px" }} className="fas fa-arrow-right"></i>
            <Container className="PostContainer">
                <form onSubmit={handleSubmit}>
                    <label>UserName : </label>
                    <select onChange={FetchID} className="username">
                        <option>Select UserName</option>
                        {state.username.map((name) => {
                            return (
                                <option value={name.id}>{name.name}</option>
                            )
                        })}
                    </select><br />
                    <label> UserID : </label>
                    <input
                        type="number"
                        name="userId"
                        className="userid"
                        value={state.userId}
                        onChange={handleChange}
                    /><br />
                    <label> Title : </label>
                    <input
                        type="text"
                        name="title"
                        className="title"
                        value={state.title}
                        onChange={handleChange}
                    /><br />
                    <label> Body : </label>
                    <input
                        type="text"
                        name="body"
                        className="body"
                        value={state.body}
                        onChange={handleChange}
                    />
                    <input type="Submit" />
                </form>
                {/* Table to display all posts */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UserId</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.posts.map((post) => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                        <Button size="sm" onClick={() => selectPost(post)}>
                                            Edit
                                        </Button><br />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deletePost(post.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Link to={`/getuser/${post.userId}`}><Button type="button" variant="secondary" size="sm">Getuser</Button></Link>
                                        <Link to={`/getcomments/${post.userId}`}><Button type="button" size="sm">GetComments</Button></Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}