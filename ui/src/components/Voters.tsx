import { useEffect, useState } from 'react';

import { getFailedToast } from '@/constants/toast.data';
import { getVotersList } from '@/actions/proposal.action';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

function Voters() {
  const toast = useToast();
  const [voters, setVoters] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getVoters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVoters = async () => {
    if (typeof id === 'string') {
      try {
        const voters = await getVotersList(+id);
        setVoters(voters);
      } catch (e: any) {
        toast(getFailedToast(e.reason ?? e.code));
      }
    }
  };

  if (voters.length === 0) {
    return <h2 className="text-center text-2xl m-8 font-medium">No Voters Found</h2>;
  }

  return (
    <div className="m-auto my-8 px-6 md:max-w-4xl">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter: any, idx: number) => (
            <tr key={voter.user}>
              <td>{idx + 1}</td>
              <td className="break-all">{voter.user}</td>
              <td>{voter.vS === 1 ? 'Accepted' : 'Rejected'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Voters;
