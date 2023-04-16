import { Button, Card, CardBody, CardFooter, CardHeader, Text, useToast } from '@chakra-ui/react';
import { getMyVote, voteForProposal } from '@/actions/proposal.action';
import { useEffect, useState } from 'react';

import GaugeChart from 'react-gauge-chart';
import { getFailedToast } from '@/constants/toast.data';
import { useMetaMaskStore } from '@/actions/metaMask.store';

enum VotingStatus {
  Pending,
  Accept,
  Reject,
}

function Proposal({ proposal }: any) {
  const toast = useToast();
  const [myVote, setMyVote] = useState<VotingStatus | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const account = useMetaMaskStore((state) => state.account);

  const totalVotes = parseInt(proposal.totalNoOfVotes);
  const percentageOfAcceptance = totalVotes
    ? parseInt(proposal.totalNoOfAcceptVotes) / parseInt(proposal.totalNoOfVotes)
    : 0;

  const getVoteDetails = async () => {
    try {
      setMyVote(await getMyVote(parseInt(proposal.id), account!));
    } catch (e: any) {
      toast(getFailedToast(e.reason));
    }
  };

  const onVote = async (vote: boolean) => {
    if (myVote === VotingStatus.Pending && !isVoted) {
      setIsVoted(true);
      try {
        const txn = await voteForProposal(vote, parseInt(proposal.id));
        await txn.wait();
        setIsVoted(false);
      } catch (e: any) {
        toast(getFailedToast(e.reason));
        setIsVoted(false);
      }
      await getVoteDetails();
    }
  };

  useEffect(() => {
    getVoteDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mb-8" variant="filled">
      <CardHeader className="flex flex-col gap-4">
        <Text>
          <strong>Proposal Id:</strong> {parseInt(proposal.id)}
        </Text>
        <Text>
          <strong>Owner:</strong> {proposal.owner}
        </Text>
      </CardHeader>
      <CardBody>
        <Text className="mb-4">
          <strong>Title:</strong> {proposal.title}
        </Text>
        <Text>
          <strong>Description:</strong>
          {proposal.description}
        </Text>
      </CardBody>
      <CardFooter className="flex items-center flex-col gap-4 md:flex-row md:justify-between">
        <a href={proposal.uploadDocPath} target="blank" className="text-blue-700 underline">
          Document link
        </a>

        <div className="text-center">
          <Text className="mb-4 font-bold">
            {myVote === VotingStatus.Pending ? 'Cast your vote' : 'You voted for'}
          </Text>
          <div className="flex gap-4">
            <Button
              variant="solid"
              colorScheme="orange"
              isDisabled={myVote === VotingStatus.Accept}
              onClick={() => onVote(false)}
            >
              Reject
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              isDisabled={myVote === VotingStatus.Reject}
              onClick={() => onVote(true)}
            >
              Accept
            </Button>
          </div>
        </div>

        <div>
          <GaugeChart
            nrOfLevels={10}
            colors={['red', 'green']}
            arcWidth={0.3}
            percent={percentageOfAcceptance}
            textColor="black"
            needleColor="grey"
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default Proposal;
