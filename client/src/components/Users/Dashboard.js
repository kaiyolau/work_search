import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {retrieveUser} from "../../actions/users";
import UserDataService from '../../services/UserService';
import { Link } from "react-router-dom";


export default function ReadProfile(props) {
    const { onSignOut } = props
    const [ userPosts, setUserPosts ] = useState({})
    // const dispatch = useDispatch();

    useEffect(() => {
        UserDataService.getUserPosts
        .then(response => {
            console.log('response',response);
            setUserPosts(response.data)
        })
        .catch(e => { console.log(e) });
    }, []);


    return (
        <ul>
          {userPosts.map((post,i) => {
              return <li key={i}>{post.id} - <Link to={`/posts/${post.id}`}>{post.jobtitle}</Link></li>
          })}
        </ul>
        );

}
