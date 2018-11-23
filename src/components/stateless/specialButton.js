import React from 'react';
import { withRouter } from 'react-router';

const SpecialButton = withRouter(({ history, path, text }) => {
  return (
    <Button
      onClick={() => { history.push(path); }}
    >
      {text}
    </Button>
  )
});