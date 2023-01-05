import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../../actions/posts";
import PostDataService from "../../services/PostService";
import {
    retrieveUser,
    deleteUser
} from "../../actions/users";
import PostDetail from "./PostDetail";

export default function Post(props) {

    const [currentPost, setCurrentPost] = useState({});
    const [message, setMessage] = useState("");
    const [ user, setUser ] = useState({})

    const dispatch = useDispatch();

    const getPost = id => {
        PostDataService.get(id)
        .then(response => {
            setCurrentPost(response.data[0])
            //remember this lesson!![0], look at the data in console
        })
        .catch(e => {
            console.log(e);
        });
    };


    useEffect(() => {
        dispatch(retrieveUser())
        .then(response => {
            // console.log('response',response);
            setUser(response)
        })
        .catch(e => { console.log(e) });
        getPost(props.match.params.id);
    }, [props.match.params.id]);


    const removePost = (id) => {
        dispatch(deletePost(currentPost.id))
        .then(() => {
            props.history.push("/posts");
        })
        .catch(e => {
            console.log(e);
        });
    };

        console.log(currentPost)
    const {jobtitle, company, location, numberOfRecruiter, skill, description, companyWebsite, expiredDate, author, id } = currentPost
    return (
        <div>
            {currentPost ?
                <PostDetail
                    jobtitle={jobtitle}
                    company={company}
                    location={location}
                    numberOfRecruiter={numberOfRecruiter}
                    skill={skill}
                    description={description}
                    companyWebsite={companyWebsite}
                    removePost={() => removePost()}
                    author={author}
                    expiredDate={expiredDate}
                    message={message}
                    id={id}
                />
                    :
                <p>Data is loading...</p>
            }
        </div>
    )
};


