import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../actions/posts";
import PostDataService from "../../services/PostService";


export default function UpdatePost(props) {

    const [currentPost, setCurrentPost] = useState({});
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const getPost = id => {
        PostDataService.get(id)
        .then(response => {

            const userObject = response.data[0]
            delete userObject.author;
            delete userObject.createdAt;
            delete userObject.author;
            delete userObject.updatedAt;
            delete userObject.__v;
            delete userObject._id;
            setCurrentPost(userObject)
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getPost(props.match.params.id);
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };


    const updateContent = () => {
        dispatch(updatePost(currentPost.id, currentPost))
        .then(response => {
            console.log(response);
            props.history.push(`/posts/${currentPost.id}`);
            setMessage("The post was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    return (
        <div>
            {currentPost ? (
                <div className="edit-form">
                <h4>JOB POSTING</h4>
                <form>
                    <div className="form-group">
                    <label htmlFor="jobtitle">Job Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="jobtitle"
                        name="jobtitle"
                        value={currentPost.jobtitle}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Company: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="company"
                            name="company"
                            value={currentPost.company}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={currentPost.location}
                            onChange={handleInputChange}
                        />
                    </div>

                <div className="form-group">
                    <label htmlFor="numberOfRecruiter">Number of recruiters: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="numberOfRecruiter"
                        name="numberOfRecruiter"
                        value={currentPost.numberOfRecruiter}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skill">Required skill/certificate: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="skill"
                        name="skill"
                        value={currentPost.skill}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea  cols="30" rows="10"
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={currentPost.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyWebsite">Website: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyWebsite"
                        name="companyWebsite"
                        value={currentPost.companyWebsite}
                        onChange={handleInputChange}
                    />
                </div>

                </form>

                <br/>
                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={updateContent}
                >
                Submit
                </button>
                <p>{message}</p>
            </div>
            ) : (
            <div>
                Loading ...
            </div>
            )}
        </div>
        );



}
