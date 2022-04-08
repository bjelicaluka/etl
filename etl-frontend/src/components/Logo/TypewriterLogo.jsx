import React from 'react';
import Typewriter from 'typewriter-effect';

export const TypewriterLogo = ({ strings=[] }) => {

  return <Typewriter
    options={{
      strings,
      autoStart: true,
      loop: true,
    }}
  />;

};