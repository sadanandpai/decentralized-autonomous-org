import { UseToastOptions } from '@chakra-ui/react';

export const enrollmentToast: UseToastOptions = {
  title: 'Successfully enrolled',
  status: 'success',
  position: 'top-right',
};

export const updateToast: UseToastOptions = {
  title: 'Successfully updated',
  status: 'success',
};

export const networkChangeToast: UseToastOptions = {
  title: 'MetaMask network changed',
  description: 'Please connect by clicking Get started',
  status: 'warning',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const accountChangeToast: UseToastOptions = {
  title: 'MetaMask account changed',
  description: 'Please connect by clicking Get started',
  status: 'warning',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const getFailedToast = (description: string): UseToastOptions => ({
  title: 'Could not complete',
  description,
  status: 'error',
});
