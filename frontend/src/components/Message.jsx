import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 6000)

    return () => {
      clearTimeout(timer)
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

export default Message