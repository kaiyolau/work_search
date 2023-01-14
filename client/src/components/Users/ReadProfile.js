import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    retrieveUser,
    deleteUser
} from "../../actions/users";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';


export default function ReadProfile(props) {
    const { onSignOut } = props
    const [ user, setUser ] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveUser())
        .then(response => {
            // console.log('response',response);
            setUser(response)
        })
        .catch(e => { console.log(e) });
    }, []);

    function deleteHandle() {
        dispatch(deleteUser())
            .then(() => {
                console.log('the current has been deleted')
            })
            onSignOut()
            props.history.push('/')
    }

    const { name, email, age } = user
    return (
            <div className="justify-content-center">
                <Card className="mb-3 ">
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>Email: {email}</CardText>
                    <CardText>Age: {age}</CardText>
                    <button className="m-3 btn btn-sm btn-danger" onClick={deleteHandle}>Delete User</button>
                </CardBody>
                </Card>
            </div>
        );

}



