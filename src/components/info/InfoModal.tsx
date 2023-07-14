import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { InfoModalStyles } from './infoModal.style';

const InfoModal = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const showTimeoutId = setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    const hideTimeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 8000);

    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(-200%)' },
    to: {
      opacity: showPopup ? 1 : 0,
      transform: showPopup ? 'translateY(0)' : 'translateY(-200%)',
    },
  });

  return (
    <animated.div
      data-testid='info-modal'
      className='explorer-info'
      style={{ ...InfoModalStyles.modal, ...animation }}
    >
      <h2 style={InfoModalStyles.h2}>Welcome to Fog of War Simulator</h2>
      <p>Move the player around the map with arrow keys or mouse move.</p>
      <p>You can track your progress in the bottom right corner.</p>
    </animated.div>
  );
};

export default InfoModal;
