import React, { useState } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import { createApp } from "../../actions/apps";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function CreateApp(props){
  const dispatch = useDispatch();
  const [resume, setResume] = useState(null);
  const [comment, setComment] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [errors, setErrors] = useState([])
  const postingId = props.match.params.postingId
  const [jsonData, setJsonData] = useState({});

  function handleResumeChange(event) {
    setResume(event.target.files[0]);
  }

  function handleCommentChange(event) {
    setComment(event.currentTarget.value);
  }

  function handleCoverLetterChange(event) {
    setCoverLetter(event.currentTarget.value);
  }


  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('comment', comment);
    formData.append('coverLetter', coverLetter);
    // console.log('this is Formdata',formData.get('comment'), formData.get('coverLetter'), formData.get('resume'))
    const fd =
      {
        comment: formData.get('comment'),
        coverLetter: formData.get('coverLetter'),
        resume: formData.get('resume')
      }
      JSON.stringify(fd)
      console.log('fd,',fd)

    dispatch(createApp(postingId, fd))
        .then(response => {
          console.log('response :', response)
            if (!response) {
                setErrors([...errors, {message: "Wrong email or password"}])
            } else if (response) {
                props.history.push(`/posts/${postingId}`)
            }
        })
  }

    return(
      <Form onSubmit={handleSubmit} className='submit-form'>
          {errors.length > 0 ? (
              <Form.Group controlId="formBasicEmail">
                  <Form.Text className="text-muted">
                  Failed to Apply, please try again.
                  </Form.Text>
                  <Form.Text className="text-muted">
                  {errors.map(error => error.message).join(", ")}
                  </Form.Text>
              </Form.Group>
          ) : (
              ''
          ) }

            <Form.Group as={Row} controlId="formResume">
              <Form.Label column sm={8}>
                Upload your resume/CV:
              </Form.Label>
              <br/>
              <Col sm={10}>
                <Form.Control type="file" onChange={handleResumeChange} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} controlId="formComment">
              <Form.Label column sm={5}>
                Comment:
              </Form.Label>
              <Col sm={20}>
                <Form.Control as="textarea" rows="3" value={comment} onChange={handleCommentChange} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} controlId="formCoverLetter">
              <Form.Label column sm={5}>
                Cover Letter:
              </Form.Label>
              <Col sm={20}>
                <Form.Control as="textarea" rows="3" value={coverLetter} onChange={handleCoverLetterChange} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" >Submit</Button>
              </Col>
            </Form.Group>
      </Form>

    )
}

export default CreateApp;
