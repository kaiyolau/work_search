import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
// import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddPost = () => {
    const [checked, setChecked] = useState(false);
    const initialPostState = {
        id: null,
        jobtitle: "",
        company: "",
        location: "",
        numberOfRecruiter: "",
        description: "",
        wage: "",
        companyWebsite: "",
        sponsorship: false,
        expiredDate:"",
        picture:null
    };
    const [post, setPost] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);
    const [picture, setPicture] = useState(null);

    const dispatch = useDispatch();

    const handleInputChange = event => {
            if (event.target.name === 'sponsorship') {
                setPost({ ...post, sponsorship: event.target.checked })
            } else {
                const { name, value } = event.target;
                setPost({ ...post, [name]: value })
            }
    };

    const handleExpiryDateChange = event => {
        setPost({ ...post, expiredDate: event });
    }


    const handlePictureChange = (event) => {
        // setPost({ ...post, picture: event.target.files[0] });
        setPicture(event.target.files[0]);
    }

    const savePost = (event) => {
        const { jobtitle, company, location, numberOfRecruiter, skill, description, wage, companyWebsite, expiredDate, sponsorship } = post;
        console.log('picture', picture)
        event.preventDefault();
        const formData = new FormData();
        formData.append('jobtitle', jobtitle);
        formData.append('company', company);
        formData.append('location', location);
        formData.append('numberOfRecruiter', numberOfRecruiter);
        formData.append('skill', skill);
        formData.append('description', description);
        formData.append('wage', wage);
        formData.append('companyWebsite', companyWebsite);
        formData.append('expiredDate', expiredDate);
        formData.append('picture', picture);
        formData.append('sponsorship', sponsorship);

        console.log('this is Formdata',formData.get('picture'))
        const form =
        {
            jobtitle: formData.get('jobtitle'),
            company: formData.get('company'),
            location: formData.get('location'),
            numberOfRecruiter: formData.get('numberOfRecruiter'),
            skill: formData.get('skill'),
            description: formData.get('description'),
            wage: formData.get('wage'),
            companyWebsite: formData.get('companyWebsite'),
            expiredDate: formData.get('expiredDate'),
            picture: formData.get('picture'),
            sponsorship: formData.get('sponsorship')
        }
        console.log('form,',form)


        // console.log('post:', post)
        dispatch(createPost(form))
        .then(data => {
            setPost({
            id: data.id,
            jobtitle: data.jobtitle,
            company: data.company,
            location: data.location,
            numberOfRecruiter: data.numberOfRecruiter,
            skill: data.skill,
            description: data.description,
            wage: data.wage,
            companyWebsite: data.companyWebsite,
            sponsorship: data.sponsorship,
            expiredDate: data.expiredDate,
            picture: data.picture
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
                    Add Post
                </button>
                </div>
            ) : (
            <div>
                <div className="form-group">
                    <label htmlFor="jobtitle">Job Title: </label>
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
                    <label htmlFor="company">Company: </label>
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
                    <label htmlFor="location">Location: </label>
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
                    <label htmlFor="numberOfRecruiter">Number Of Recruiters: </label>
                    <input
                    type="number"
                    className="form-control"
                    id="numberOfRecruiter"
                    required
                    value={post.numberOfRecruiter}
                    onChange={handleInputChange}
                    name="numberOfRecruiter"
                    placeholder="optional"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skill">Required skill/certificate: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="skill"
                    required
                    value={post.skill}
                    onChange={handleInputChange}
                    name="skill"
                    placeholder="optional"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea cols="30" rows="10"
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={post.description}
                        onChange={handleInputChange}
                        name="description"
                        placeholder="minimum 50 words"

                    >
                        Description
                    </textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="wage">hourly Wage: </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                    </div>
                    <input
                    type="number"
                    className="form-control"
                    id="wage"
                    required
                    value={post.wage}
                    onChange={handleInputChange}
                    name="wage"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyWebsite">Website: </label>
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
                <br/>

                <div className="form-check">
                    <label  check className="form-check-label" htmlFor="sponsorship">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="sponsorship"
                        required
                        checked={post.sponsorship}
                        onChange={handleInputChange}
                        name="sponsorship"
                        />Click me to be a sponsorship
                    </label>
                </div>

                <br/>
                <div className="form-group">
                    <label>Select a expired date: </label>
                    <DatePicker className="form-control"
                        selected={post.expiredDate || new Date()}
                        value={post.expiredDate}
                        id="expiredDate"
                        onChange={ handleExpiryDateChange}
                        name="expiredDate" />

                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="picture" className='custom-file-label'>Upload job post Picture:</label>
                    <br/>
                    <input
                    type="file"
                    className="custom-file-input"
                    id="picture"
                    onChange={handlePictureChange}
                    value={post.picture}
                    placeholder="optional"
                    />
                </div>


                <br/>
                <button onClick={savePost} className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
        )}
    </div>
    );
};

export default AddPost;
