import { Avatar, AvatarBadge, useToast } from '@chakra-ui/react';

import { getFailedToast } from '@/constants/toast.data';
import { getUserDetails } from '@/actions/user.action';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { useMetaMaskStore } from '@/stores/metaMask.store';
import { useRouter } from 'next/router';

function MetaMaskButton() {
  const router = useRouter();
  const toast = useToast();
  const [connectToMetaMask, account, provider, isNewUser, setIsNewUser] = useMetaMaskStore(
    (state) => [
      state.connectToMetaMask,
      state.account,
      state.provider,
      state.isNewUser,
      state.setIsNewUser,
    ],
    shallow
  );

  useEffect(() => {
    if (account) {
      getUserDetails(account).then(
        (userDetails) => {
          if (!userDetails) {
            router.push('/profile');
            setIsNewUser(true);
            return;
          }

          setIsNewUser(false);
        },
        (e: any) => {
          toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const onClick = () => {
    if (!provider) {
      connectToMetaMask();
    } else {
      router.push('/profile');
    }
  };

  return (
    <button onClick={onClick}>
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
        height="10"
        width="10"
        showBorder={true}
        borderColor="green"
        className="p-1"
      >
        <AvatarBadge boxSize="1em" bg={`${provider ? 'green.500' : 'orange.500'}`} />
      </Avatar>
    </button>
  );
}

export default MetaMaskButton;
