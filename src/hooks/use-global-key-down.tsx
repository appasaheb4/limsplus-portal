import { useEffect } from 'react';

const useGlobalKeydown = keyMap => {
  useEffect(() => {
    const handleKeyDown = event => {
      const { key, ctrlKey } = event;
      const action = keyMap[key];
      if (ctrlKey && action) {
        event.preventDefault();
        action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyMap]);
};

export default useGlobalKeydown;
