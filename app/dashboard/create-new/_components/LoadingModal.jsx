import Image from 'next/image';
import React from 'react';

const LoadingModal = ({ loading }) => {
  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          width: '30%',
          padding: '20px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center align items horizontally
          justifyContent: 'center', // Center align items vertically
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p
          style={{
            marginTop: '10px', // Add spacing between image and text
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Do not refresh the page 
        </p>
        {/* Image */}
        <Image src={'/progress.gif'} width={70} height={70} alt="Loading spinner" />

        {/* Text */}
        <p
          style={{
            marginTop: '10px', // Add spacing between image and text
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Generating your video... 
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
