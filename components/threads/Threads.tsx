import { Text } from '@medusajs/ui';
import { RiCloseFill } from '@remixicon/react';
import React, { useEffect, useMemo } from 'react';
import MessageItem from '../chat/MessageItem';
import { useThreadStore } from '@/store/threadStore';
import { useChannelMessagesListQuery } from '@/lib/queries/channels-queries';
import { useParams, usePathname } from 'next/navigation';
import { Message } from 'postcss';
import removeDuplicatesFromArrayObjects from '@/services/helpers/remove-duplicates-from-array-of-objects';
import ThreadReplies from './ThreadReplies';
import { useSocket } from '@/providers/socket-provider';
import Tiptap from '../tiptap/Tiptap';
import { useQueryClient } from '@tanstack/react-query';
import useIncreaseReply from '@/hooks/use-increase-replies';

const Threads = () => {
  const {
    message: ThreadMsg,
    setMessage,
    setIsVisible,
    isVisible,
  } = useThreadStore();
  const { channelId, workspaceId } = useParams();
  const { socket } = useSocket();
  const pathname = usePathname();

  useEffect(() => {
    if (+channelId !== ThreadMsg?.channel?.id) {
      setIsVisible(false);
    }
  }, [pathname]);

  const closeThread = () => {
    console.log('close thread', isVisible);
    setIsVisible(false);
  };

  const [messageSocketList, setMessageSocketList] = React.useState<Message[]>(
    [],
  );

  useEffect(() => {
    setMessageSocketList([]);
  }, [ThreadMsg]);

  const { incrementChildCountOfMessage } = useIncreaseReply({
    channelId: Number(channelId),
  });

  const {
    data: threadMsgs,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChannelMessagesListQuery({
    messageId: ThreadMsg?.id?.toString(),
    channelId: channelId?.toString(),
    filter: { draft: false, parentMessageId: ThreadMsg?.id },
  });
  const Threadsresult = useMemo(() => {
    const result =
      (threadMsgs?.pages.flatMap(
        (page) => page?.data,
      ) as unknown as Message[]) ?? ([] as Message[]);
    if (result.at(0) !== undefined && result.length > 0) {
      return removeDuplicatesFromArrayObjects(result, 'id');
    }
  }, [threadMsgs, isVisible]);

  const queryClient = useQueryClient();
  const invalidateChannelMessagesListQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [
        'channelMessages',
        'list',
        'channels',
        channelId?.toString(),
        'published',
        `parentMessageId:${ThreadMsg?.id?.toString()}`,
      ],
    });
  };
  useEffect(() => {
    invalidateChannelMessagesListQuery();
  }, [isVisible, ThreadMsg]);

  const handelsend = (content: string) => {
    socket.emit(
      'message_sent',
      {
        seq: 4,
        event: 'message_sent',
        data: {
          content: content,
          draft: false,
          channel: {
            id: channelId,
          },
          workspace: {
            id: workspaceId,
          },
          parentMessage: {
            id: ThreadMsg?.id,
          },
        },
      },
      (response: any) => {
        console.log('New socket msg emit', response);
        const tempmsg = messageSocketList;
        incrementChildCountOfMessage(
          response?.data?.message?.parentMessage?.id,
        );

        setMessageSocketList([response.data.message, ...tempmsg]);
      },
    );
  };

  socket.on('message_sent', (data: any) => {
    console.log('New socket msg on', data);
    if (data?.parentMessage?.id !== ThreadMsg?.id) {
      return;
    }
    console.log('New socket msg on', data);
    const tempmsg = messageSocketList;
    setMessageSocketList([data, ...tempmsg]);
    console.log('messageSocketList', messageSocketList);
  });

  if (!ThreadMsg) return null;

  return (
    <div id="style-1" className="h-screen overflow-auto">
      <div className=" flex  flex-col ">
        <div className="flex justify-between px-4 pb-3 pt-5">
          <Text as="span" size="large" leading="normal">
            Thread
          </Text>
          <RiCloseFill
            tabIndex={0}
            onClick={closeThread}
            size={20}
            className="cursor-pointer text-ui-fg-muted"
          />
        </div>

        <MessageItem message={ThreadMsg} isThread={true} />
        <div className="flex items-center gap-3 pl-3 text-ui-fg-subtle ">
          <Text
            as="span"
            size="small"
            leading="compact"
            className=" inline min-w-fit grow"
          >
            {ThreadMsg?.childsCount}{' '}
            {ThreadMsg?.childsCount > 1 ? 'replies' : 'reply'}
          </Text>
          <div className="h-0.5 w-full grow bg-ui-bg-base-pressed"></div>
        </div>
        {/* TODO */}
        <ThreadReplies
          threadMsgs={Threadsresult as any}
          messageSocketList={messageSocketList as any}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />

        <div className="  px-5 py-2">
          <div className=" rounded-xl border border-ui-border-base bg-ui-bg-field p-1.5">
            <Tiptap handelsend={handelsend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
