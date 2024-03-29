import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../actions/posts";
import PostDataService from "../../services/PostService";


export default function UpdatePost(props) {

    const [currentPost, setCurrentPost] = useState({});
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const [picture, setPicture] = useState(null);

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
        if (event.target.name === 'sponsorship') {
            setCurrentPost({ ...currentPost, sponsorship: event.target.checked })
        } else {
            const { name, value } = event.target;
            setCurrentPost({ ...currentPost, [name]: value })
        }
        // const { name, value } = event.target;
        // setCurrentPost({ ...currentPost, [name]: value });
    };
    const handlePictureChange = (event) => {
        // setPost({ ...post, picture: event.target.files[0] });
        setPicture(event.target.files[0]);
    }


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
                    <label htmlFor="wage">hourly Wage: </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                    </div>
                    <input
                    type="number"
                    className="form-control"
                    id="wage"
                    name="wage"
                    value={currentPost.wage}
                    onChange={handleInputChange}
                    />
                    </div>
                <div/>

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

                <div className="form-check">
                    <label  check className="form-check-label" htmlFor="sponsorship">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="sponsorship"
                        required
                        value={currentPost.sponsorship}
                        onChange={handleInputChange}
                        name="sponsorship"
                        />Click me to be a sponsorship
                    </label>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="picture">Upload Picture:</label>
                    <input
                    type="file"
                    className="form-control-file"
                    id="picture"
                    onChange={handlePictureChange}
                    value={currentPost.picture}
                    placeholder="optional"
                    />
                </div> */}

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
