import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, timeout }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
        timeout !== 'show' && setShow(false)
    }, 6000)

    return () => {
      clearTimeout(timer)
    }
  }, [variant]);

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