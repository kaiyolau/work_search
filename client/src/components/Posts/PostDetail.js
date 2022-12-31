import React from 'react';

function PostDetail(props) {
    return(
        <div>
            <h1>Post</h1>
            <h3>job title: {props.jobtitle}</h3>
            <p>Company: {props.company}</p>
            <p>Location: {props.location}</p>
            <p>Number Of Recruiter: {props.numberOfRecruiter}</p>
            <p>description: {props.description}</p>
            <p>Website: {props.companyWebsite}</p>
            <button>Apply</button>
            {/* <button className="badge badge-danger mr-2" onClick={props.removePost()}>
                Delete
            </button> */}
            {/* <button
                type="submit"
                className="badge badge-success"
                onClick={props.updateContent}
            >
                Update
            </button> */}
            <p>{props.message}</p>
        </div>
    )
}

export default PostDetail;
