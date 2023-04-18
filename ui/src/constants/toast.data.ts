import { UseToastOptions } from '@chakra-ui/react';

interface TitleDescriptionIntf {
  title: string;
  description?: string;
}

export const getSuccessToast = ({
  title = 'Transaction successful',
  description,
}: TitleDescriptionIntf): UseToastOptions => ({
  title,
  description,
  status: 'success',
});

export const getFailedToast = ({
  title = 'Transaction failed',
  description,
}: TitleDescriptionIntf): UseToastOptions => ({
  title,
  description,
  status: 'error',
});

export const connectToast: UseToastOptions = {
  title: 'Successfully connected',
  status: 'success',
  duration: 3000,
  isClosable: true,
  position: 'bottom-right',
};

export const networkChangeToast: UseToastOptions = {
  title: 'MetaMask network changed',
  description: 'Please connect by clicking Get started',
  status: 'warning',
  duration: 3000,
  isClosable: true,
  position: 'bottom-right',
};

export const accountChangeToast: UseToastOptions = {
  title: 'MetaMask account changed',
  description: 'Please connect again',
  status: 'warning',
  duration: 3000,
  isClosable: true,
  position: 'bottom-right',
};

export const connectFailedToast: UseToastOptions = {
  title: 'Error while connecting to Metamask',
  description: 'Make sure you approve the connection to Metamask',
  status: 'error',
  duration: 3000,
  isClosable: true,
  position: 'bottom-right',
};
