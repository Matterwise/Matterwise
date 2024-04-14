'use client';
import ChatHeader from '@/components/chat/ChatHeader';
import Message from '@/components/chat/Message';
import Tiptap from '@/components/tiptap/Tiptap';
import { useGetChannelService } from '@/services/api/services/channels';
import HTTP_CODES_ENUM from '@/services/api/types/http-codes';
import withPageRequiredAuth from '@/services/auth/with-page-required-auth';
import { Channel } from '@/types/channels-types';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const page = () => {
  const { channelId } = useParams();
  const fetchGetChannel = useGetChannelService();
  const [channel, setChannel] = useState<Channel>();

  const getChannel = useMemo(async () => {
    const { status, data } = await fetchGetChannel({ id: Number(channelId) });
    console.log('data', data);
    if (status === HTTP_CODES_ENUM.OK) {
      setChannel(data);
    }
  }, [channelId]);

  return (
    <div className=" flex min-h-screen flex-col justify-between">
      <ChatHeader>
        <ChatHeader.Title>
          <ChatHeader.Icon />
          {channel?.title}
        </ChatHeader.Title>
        <ChatHeader.Actions workspaceMembers={channel?.members} />
      </ChatHeader>
      <div className=" h-full flex-1 ">
        <Message />
      </div>
      <div>
        <Tiptap />
      </div>
    </div>
  );
};

export default withPageRequiredAuth(page);
