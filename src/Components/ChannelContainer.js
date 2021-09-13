import {
  Channel,
  MessageTeam
} from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({
  IsCreating,
  setIsCreating,
  IsEditing,
  setIsEditing,
  CreateType,
}) => {

  if (IsCreating) {
    return (
      <div className="channel__container">
        <CreateChannel CreateType={CreateType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (IsEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => {
    return (
      <div className="channel-empty__container">
        <div className="channel-empty__first">
          This is the beginning of your chat history.
        </div>
        <div className="channel-empty__second">
          Send messages, attachments, links, emojis, and more!
        </div>
      </div>
    );
  };

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
