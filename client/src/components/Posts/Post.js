import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePost, deletePost } from "../../actions/posts";
import PostDataService from "../../services/PostService";
import PostDetail from "./PostDetail";

export default function Post(props) {

    const [currentPost, setCurrentPost] = useState({});
    const [message, setMessage] = useState("");

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
        getPost(props.match.params.id);
    }, [props.match.params.id]);

    // const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setCurrentPost({ ...currentPost, [name]: value });
    // };


    const updateContent = () => {
        dispatch(updatePost(currentPost.id, currentPost))
        .then(response => {
            console.log(response);

            setMessage("The post was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

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
    const {jobtitle, company, location, numberOfRecruiter, description, companyWebsite } = currentPost
    return (
        <div>
            {currentPost ?
                <PostDetail
                    jobtitle={jobtitle}
                    company={company}
                    location={location}
                    numberOfRecruiter={numberOfRecruiter}
                    description={description}
                    companyWebsite={companyWebsite}
                    removePost={() => removePost()}
                    updateContent={updateContent}
                    message={message}

                />
                    :
                <p>Data is loading...</p>
            }
        </div>
    )
};


