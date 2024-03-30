import { useState, useEffect } from 'react';

const useId = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(`id-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  return id;
};

export default useId;
