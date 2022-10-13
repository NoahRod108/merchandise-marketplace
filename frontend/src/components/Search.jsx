import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    const [searchWord, setSearchWord] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if(searchWord.trim()){
            navigate(`/search/${searchWord}`);
        }else{
            navigate('/');
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex search-bar'>
        <Form.Control type='text' name='searchBox' placeholder='Search...' className='mr-sm-2 ml-sm-5' onChange={(e) => setSearchWord(e.target.value)}></Form.Control>
        <Button type='submit' varaint='outline-success p-2'>Search</Button>
    </Form>
  )
}

export default Search