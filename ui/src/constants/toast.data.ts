import { UseToastOptions } from '@chakra-ui/react';

export const enrollmentToast: UseToastOptions = {
  title: 'Successfully enrolled',
  status: 'success',
};

export const updateToast: UseToastOptions = {
  title: 'Successfully updated',
  status: 'success',
};

export const connectToast: UseToastOptions = {
  title: 'Successfully connected',
  status: 'success',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
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
  description: 'Please connect again',
  status: 'warning',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const connectFailedToast: UseToastOptions = {
  title: 'Error while connecting to Metamask',
  description: 'Make sure you approve the connection to Metamask',
  status: 'error',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const getFailedToast = (description: string): UseToastOptions => ({
  title: 'Somthing went wrong',
  description,
  status: 'error',
});
