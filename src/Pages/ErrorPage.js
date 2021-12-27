import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <>
      <h1>존재하지 않는 페이지</h1>
      <p>Home 으로 가려면 아래 버튼을 누르세요.</p>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        HOME
      </button>
    </>
  );
};

export default ErrorPage;
