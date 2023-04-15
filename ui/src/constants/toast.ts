import { UseToastOptions } from '@chakra-ui/react';

export const enrollmentToast: UseToastOptions = {
  title: 'Successfully enrolled',
  status: 'success',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const updateToast: UseToastOptions = {
  title: 'Successfully updated',
  status: 'success',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

export const getFailedToast = (description: string): UseToastOptions => ({
  title: 'Could not complete',
  description,
  status: 'error',
  duration: 3000,
  isClosable: true,
  position: 'top-right',
});
