import { Avatar, AvatarBadge } from '@chakra-ui/react';

import { useEffect } from 'react';
import { useMetaMaskStore } from '@/actions/metaMask.store';
import { useRouter } from 'next/router';

function MetaMaskButton() {
  const router = useRouter();
  const [connectToMetaMask, provider] = useMetaMaskStore((state) => [
    state.connectToMetaMask,
    state.provider,
  ]);

  useEffect(() => {
    router.push('/profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <button onClick={connectToMetaMask}>
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
