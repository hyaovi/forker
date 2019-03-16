import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => (
  <Spinner
    color="info"
    className="mb-3"
    style={{ width: '3rem', height: '3rem' }}
  />
);
export default Loading;
