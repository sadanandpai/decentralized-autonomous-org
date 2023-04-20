import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react';
import { getVotersList, voteForProposal } from '@/actions/proposal.action';
import { useEffect, useState } from 'react';

import GaugeChart from 'react-gauge-chart';
import Link from 'next/link';
import { getFailedToast } from '@/constants/toast.data';
import { useMetaMaskStore } from '@/stores/metaMask.store';
import { useProposalsStore } from '@/stores/proposals.store';

enum Status {
  Pending,
  Accept,
  Reject,
}

function Proposal({ proposal }: any) {
  const toast = useToast();
  const [myVote, setMyVote] = useState<Status | null>(null);
  const account = useMetaMaskStore((state) => state.account);
  const getProposals = useProposalsStore((state) => state.getProposals);

  const totalVotes = parseInt(proposal.totalNoOfVotes);
  const percentageOfAcceptance = totalVotes
    ? parseInt(proposal.totalNoOfAcceptVotes) / parseInt(proposal.totalNoOfVotes)
    : 0;

  const getVoteDetails = async () => {
    try {
      const votersList = await getVotersList(parseInt(proposal.id));
      const vote = votersList.find(
        (voter: any) => voter.user?.toLowerCase() === account?.toLowerCase()
      )?.vS;
      setMyVote(vote ?? Status.Pending);
    } catch (e: any) {
      toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
    }
  };

  const onVote = async (vote: boolean) => {
    if (myVote === Status.Pending) {
      try {
        const txn = await voteForProposal(vote, parseInt(proposal.id));
        await txn.wait();
      } catch (e: any) {
        toast(getFailedToast({ title: e.data?.data?.reason ?? e.reason ?? e.code }));
      }
      await getVoteDetails();
      getProposals();
    }
  };

  useEffect(() => {
    if (proposal.status === Status.Pending) {
      getVoteDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardHeader = (
    <CardHeader className="flex flex-col gap-4">
      <Text>
        <strong>Proposal Id:</strong> {parseInt(proposal.id)}
      </Text>
      <Text>
        <strong>Owner:</strong>
        <Link href={`/users/${proposal.owner}`} className="text-blue-700 underline">
          {proposal.owner}
        </Link>
      </Text>
    </CardHeader>
  );

  const cardBody = (
    <CardBody>
      <Text className="mb-4">
        <strong>Title:</strong> {proposal.title}
      </Text>
      <Text>
        <strong>Description:</strong>
        {proposal.description}
      </Text>
    </CardBody>
  );

  const cardFooter = (
    <CardFooter className="flex flex-col">
      <div className="flex items-center flex-col gap-4 md:flex-row md:justify-between">
        <a href={proposal.uploadDocPath} target="blank" className="text-blue-700 underline">
          Document link
        </a>

        {proposal.status === Status.Pending ? (
          <div className="text-center">
            <Text className="mb-4 font-bold">
              {myVote === Status.Pending ? 'Cast your vote' : 'You voted for'}
            </Text>
            <div className="flex gap-4">
              <Button
                variant="solid"
                colorScheme="orange"
                isDisabled={myVote === Status.Accept}
                onClick={() => onVote(false)}
              >
                Reject
              </Button>
              <Button
                variant="solid"
                colorScheme="green"
                isDisabled={myVote === Status.Reject}
                onClick={() => onVote(true)}
              >
                Accept
              </Button>
            </div>
          </div>
        ) : (
          <span>
            Proposal got{' '}
            <strong>{proposal.status === Status.Accept ? 'Accepted' : 'Rejected'}</strong>
          </span>
        )}

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
      </div>

      <p className="text-center m-4">
        Total votes: {totalVotes} Accepted: {parseInt(proposal.totalNoOfAcceptVotes)} Rejected:{' '}
        {parseInt(proposal.totalNoOfRejectVotes)}
        <br />
        <Link href={`/proposal/${proposal.id}`} className="text-blue-700 underline">
          Details
        </Link>
      </p>
    </CardFooter>
  );

  return (
    <Card className="mb-8" variant="filled">
      {proposal.status === Status.Pending && (
        <Tag className="absolute right-4 -translate-y-1/2" size="lg" color="blue">
          Active
        </Tag>
      )}
      {cardHeader}
      {cardBody}
      {cardFooter}
    </Card>
  );
}

export default Proposal;
