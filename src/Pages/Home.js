import React from 'react';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const timeout = 30000; // timeout 30초
  const [remaining, setRemaining] = useState(timeout); // 남은 시간, 기본값은  timeout = 30000;  (30초)
  const [lastActive, setLastActive] = useState(+new Date()); // +new Date() 현재시간을 millisecond 로 가져옴
  const [isIdle, setIsIdle] = useState(false); // 타임아웃 상태 체크 기본값 false

  let navigate = useNavigate(); // TimeOut page로 이동하기 위해 필요

  const handleOnActive = () => setIsIdle(false); // 사용자가 더 이상 유휴 상태가 아닐 때 isIdle 값 false
  const handleOnIdle = () => setIsIdle(true); //  사용자가 유휴 상태일 때 isIdle 값 true

  const {
    reset, // idleTimer를 재설정합니다. onActive 호출.
    pause, // idleTimer를 일시 정지합니다.
    resume, // 일시 중지된 idleTimer를 다시 시작합니다.
    getRemainingTime, // Methods 남은 시간(밀리초)을 반환합니다.
    getLastActiveTime, // Methods 사용자가 마지막으로 유휴 상태였던 타임스탬프를 반환합니다.
  } = useIdleTimer({
    timeout,
    crossTab: true,
    onActive: handleOnActive, // 사용자가 더 이상 유휴 상태가 아닐 때 호출하는 함수
    onIdle: handleOnIdle, //  사용자가 유휴 상태일 때 호출하는 함수입니다.
  });

  const handleReset = () => reset();
  const handlePause = () => pause();
  const handleResume = () => resume();

  // 컴포넌트가 렌더링 된 후 useEffect 실행
  useEffect(() => {
    setRemaining(getRemainingTime()); // 남은 시간 set
    setLastActive(getLastActiveTime()); // 마지막 활동 시간 set

    // 1초마다 남은시간, 마지막 활동 시간을 set한다.
    setInterval(() => {
      setRemaining(getRemainingTime());
      setLastActive(getLastActiveTime());
    }, 1000);
  }, [getRemainingTime, getLastActiveTime]); // getRemainingTime, getLastActiveTime 의존성 주입

  // TimeOut 페이지로 이동
  useEffect(() => {
    if (isIdle && remaining.toString() === '0') {
      // isIdle 이 true고 남은시간이 0 일 때
      navigate('/TimeOut', { state: { sessionTimeOut: true } }); // TimeOut 페이지로 이동.
    }
  }, [isIdle, navigate, remaining]); // isIdle, navigate, remaining 의존성 주입

  return (
    <>
      <h1>HOME</h1>
      <div>
        <h2>Timeout: {timeout}ms</h2>
        <h2>남은 시간: {remaining}</h2>
        <h2>
          마지막 활동 시간: {format(lastActive, 'MM-dd-yyyy HH:MM:ss.SSS')}
        </h2>
        <h2>Idle: {isIdle.toString()}</h2>
      </div>
      <div>
        <button onClick={handleReset}>RESET</button>
        <button onClick={handlePause}>PAUSE</button>
        <button onClick={handleResume}>RESUME</button>
      </div>
    </>
  );
};

export default Home;
