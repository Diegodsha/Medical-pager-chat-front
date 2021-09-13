import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ channel, type, setToggleConatiner,setIsCreating,
  setIsEditing, setActiveChannel }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <div className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </div>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
          setIsCreating(false)
          setIsEditing(false)
          setActiveChannel(channel)

          if(setToggleConatiner){
            setToggleConatiner((prevState) => !prevState)
          }
      }}
    >{ type === 'team' ? <ChannelPreview /> : <DirectPreview /> }</div>
  );
};

export default TeamChannelPreview;
