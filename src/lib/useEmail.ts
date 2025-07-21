import { useEffect, useState } from 'react';

const ENCODED_EMAIL = 'YXV0b21hdGEucHJvZC5hc3NvQGdtYWlsLmNvbQ==';

export const useEmail = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const decodedEmail = atob(ENCODED_EMAIL);
    setEmail(decodedEmail);
  }, []);

  return email;
};