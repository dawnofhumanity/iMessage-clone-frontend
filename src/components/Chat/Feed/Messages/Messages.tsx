import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@apollo/client";
import { Query } from "@/graphql/types/message";
import MessagesResponse = Query.MessagesResponse;
import MessagesVariables = Query.MessagesVariables;
import { MessageOperations } from "@/graphql/operations/message";
import toast from "react-hot-toast";

export type MessagesProps = {
  userId: string;
  conversationId: string;
};

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesResponse,
    MessagesVariables
  >(MessageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return (
    <Flex direction={"column"} justify={"flex-end"} overflow={"hidden"}>
      {loading && (
        <Stack>
          {/*<SkeletonLoader count={4} height={"60px"} width={"100%"} />*/}
          <span>LOADING MESSAGES</span>
        </Stack>
      )}
      {data?.messages && (
        <Flex direction={"column-reverse"} height={"100%"} overflowY={"scroll"}>
          {data.messages.map((message) => (
            // <MessageItem />
            <div>{message.body}</div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
