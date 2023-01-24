import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    } from '@material-ui/core';
import PostService from '../../services/PostService';


function PostDetail(props) {
    const {
        jobtitle,
        company,
        location,
        numberOfRecruiter,
        skill,
        description,
        wage,
        companyWebsite,
        sponsorship,
        expiredDate,
        picture,
        message,
        author,
        id
    } = props

    const userId = useSelector(state => state.users.id);

    return(
        <Card>
            <CardHeader
                title={jobtitle}
                />
            <CardContent>
                <Typography>
                    <strong>Company:</strong> {company}
                </Typography>
                <br/>
                <Typography>
                    <strong>Location:</strong> {location}
                </Typography>
                <br/>
                <Typography>
                    <strong>Number of recruiters:</strong> {numberOfRecruiter}
                </Typography>
                <br/>
                <Typography>
                    <strong>Required skill/certificate:</strong> {skill}
                </Typography>
                <br/>
                <Typography>
                    <strong>Description:</strong> {description}
                </Typography>
                <br/>
                <Typography>
                    <strong>Wage:</strong> {wage}
                </Typography>
                <br/>
                <Typography>
                    <strong>Website:</strong> <a href={companyWebsite}>{companyWebsite}</a>
                </Typography>
                <br/>
                <Typography>
                    <strong>Sponsorship:</strong> {sponsorship}
                </Typography>
                <br/>
                <Typography>
                    <strong>Expired date:</strong> {expiredDate}
                </Typography>
                <Typography>
                    <strong>Picture:</strong>
                    <br/>
                    <img
                        src={`data:image/png;base64, ${picture}`}
                        // style={{ objectFit: "none", overflow: "hidden", width: "200px", height: "200px" }}
                    />
                </Typography>
                <br/>
                {userId === author ? (
                    <>
                        <Button component={Link} to={`/posts/${id}/update`} >
                            Update Post
                        </Button>
                        <br/>
                        <Button onClick={props.removePost}>Delete</Button>
                    </>
                ) : (
                    <div></div>
                )}
                    <br/>
                    <Button component={Link} to={`/posts/${id}/apps`} >Apply</Button>
                <Typography>
                    <strong>Message</strong> {message}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PostDetail;
