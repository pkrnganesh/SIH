import React from 'react';
import { Stars, OrbitControls } from '@react-three/drei';

const Background3D = () => {
  return (
    <>
      <Stars />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
};

export default Background3D;