import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

const AddPost = () => {
    const initialPostState = {
        id: null,
        jobtitle: "",
        company: "",
        location: "",
        numberOfRecruiter: "",
        description: "",
        companyWebsite: "",
        expiredDate: ""
    };
    const [post, setPost] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const savePost = () => {
        const { jobtitle, company, location, numberOfRecruiter, description, companyWebsite, expiredDate } = post;

        dispatch(createPost(jobtitle, company, location, numberOfRecruiter, description, companyWebsite, expiredDate))
        .then(data => {
            setPost({
            id: data.id,
            jobtitle: data.jobtitle,
            company: data.company,
            location: data.location,
            numberOfRecruiter: data.numberOfRecruiter,
            description: data.description,
            companyWebsite: data.companyWebsite,
            expiredDate: data.expiredDate
            });
            setSubmitted(true);

            console.log(data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const newPost = () => {
        setPost(initialPostState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newPost}>
                Add
            </button>
            </div>
        ) : (
            <div>
            <div className="form-group">
                <label htmlFor="jobtitle">Job Title</label>
                <input
                type="text"
                className="form-control"
                id="jobtitle"
                required
                value={post.jobtitle}
                onChange={handleInputChange}
                name="jobtitle"
                />
            </div>

            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                type="text"
                className="form-control"
                id="company"
                required
                value={post.company}
                onChange={handleInputChange}
                name="company"
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                type="text"
                className="form-control"
                id="location"
                required
                value={post.location}
                onChange={handleInputChange}
                name="location"
                />
            </div>

            <div className="form-group">
                <label htmlFor="numberOfRecruiter">Number Of Recruiter</label>
                <input
                type="number"
                className="form-control"
                id="numberOfRecruiter"
                required
                value={post.numberOfRecruiter}
                onChange={handleInputChange}
                name="numberOfRecruiter"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                type="text"
                className="form-control"
                id="description"
                required
                value={post.description}
                onChange={handleInputChange}
                name="description"
                />
            </div>

            <div className="form-group">
                <label htmlFor="companyWebsite">Website</label>
                <input
                type="text"
                className="form-control"
                id="companyWebsite"
                required
                value={post.companyWebsite}
                onChange={handleInputChange}
                name="companyWebsite"
                />
            </div>

            <button onClick={savePost} className="btn btn-success">
                Submit
            </button>
            </div>
        )}
        </div>
    );
};

export default AddPost;
