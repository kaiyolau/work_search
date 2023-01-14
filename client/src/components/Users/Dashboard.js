import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {retrieveUserPosts} from "../../actions/users";
import UserDataService from '../../services/UserService';
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';


export default function Dashboard(props) {
    const { onSignOut } = props
    const [ userPosts, setUserPosts ] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (jobId) => {
        history.push(`/posts/${jobId}`);
    }

    useEffect(() => {
        dispatch(retrieveUserPosts())
        .then(response => {
            // console.log('response',response);
            setUserPosts(response)
        })
        .catch(e => { console.log(e) });
    }, []);


    return (
        <div>
            <div className="jumbotron text-center" style={{backgroundColor:"#f2f2f2", marginBottom:"20px"}}>
                <h1 className="display-4">Check Your Job Posting Status</h1>
                <p className="lead">Find your job posting and check the status</p>
            </div>
            {userPosts.map((post) => (
                        <Card key={post.id} className="mb-3" style={{margin: "10px"}}>
                                <CardBody>
                                    <CardTitle>{post.jobtitle}</CardTitle>
                                    <Button onClick={() => handleClick(post.id)} color="primary">View Details</Button>
                                </CardBody>
                        </Card>
            ))}
        </div>
        );

}
