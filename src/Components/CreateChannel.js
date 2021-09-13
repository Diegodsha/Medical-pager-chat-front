import { useChatContext } from 'stream-chat-react';
import { UserList } from './';
import { CloseCreateChannel } from '../assets';
import { useState } from 'react';

const ChannelNameInput = ({ ChannelName = '', setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        type="text"
        value={ChannelName}
        onChange={handleChange}
        placeholder="channel-name (no spaces)"
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ CreateType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [ChannelName, setChannelName] = useState('');
  const [SelectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const createChannel = async (e) => {
    e.preventDefault();

    try {
        const newChannel = await client.channel(CreateType, ChannelName, {
            name: ChannelName,
            members: SelectedUsers
        })

        await newChannel.watch()
        setChannelName('')
        setIsCreating(false)
        setSelectedUsers([client.userID])
        setActiveChannel(newChannel)

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {CreateType === 'team'
            ? 'Create a New Channel'
            : 'Send a Direct Message'}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {CreateType === 'team' && (
        <ChannelNameInput
          ChannelName={ChannelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
          <p>{CreateType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  );
};

export default CreateChannel;
