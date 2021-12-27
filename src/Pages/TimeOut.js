import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import swal from 'sweetalert';

/*
1. useLoaction 은 location 객체를 반환한다.

2. location 객체에는

    2-1. pathname : URL에 도메인다음의 / 부터의 문자열

    2-2. search : pathname다음의 ?부터의 문자열

    2-3. hash : pathname다음의 #부터의 문자열

    2-4. state : location 객체로 화면이동을 시킬 때 코드 상으로 보내는 객체

    2-5. key : history stack에서 해당 location 객체를 찾기위한 고유키


3. 화면이동 시 보통 단순한 문자열 path를 통과시키지만 세세하게 컨트롤하기 위해 location 객체를 통과시킬 수도 있다.


4. location 객체로 화면이동을 시키는 건 Route와 Switch 덕분에 화면이동이 되어지는 것처럼 보일 뿐이다.

*/

const TimeOut = (props) => {
  const [timeOut, setTimeOut] = useState(false);
  const location = useLocation(); //  useLocation 훅은 현재의 URL을 대표하는 location 객체를 반환한다
  const sessionTimeOut = location?.state?.sessionTimeOut; // sessionTimeOut 상태값을 받아온다.

  let navigate = useNavigate();

  useEffect(() => {
    setTimeOut(sessionTimeOut); // timeout값 set 타임아웃되어 페이지 이동한 경우 true값이 넘어온다.

    // timeOut 이 true이면 동작
    if (timeOut) {
      swal({
        title: '세션이 종료되었습니다.',
        icon: 'warning',
      }).then(() => {
        navigate({ state: {} }); // state 초기화
      });
    }
  }, [timeOut]); // timeOut 의존성 주입

  return (
    <>
      <h1>Time Out Page</h1>
      <p>Home 으로 가려면 아래 버튼을 누르세요.</p>
      <button
        onClick={() => {
          navigate('/'); // HOME으로 이동
        }}
      >
        HOME
      </button>
    </>
  );
};

export default TimeOut;
