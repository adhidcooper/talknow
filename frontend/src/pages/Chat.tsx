import React from 'react'
import { useParams } from 'react-router-dom';

const Chat:React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  return (
    <div>
      <h1>Chat Channel: {channelId}</h1>
    </div>
  )
}

export default Chat;
