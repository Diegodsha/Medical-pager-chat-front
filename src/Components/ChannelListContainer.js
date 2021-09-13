import { ChannelList, useChatContext, Avatar } from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import Cookies from 'universal-cookie';
import { FaHospital } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

const cookies = new Cookies();

const SideBar = ({ logout, client }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <FaHospital style={{ width: '30px', height: '30px' }} />
      </div>
    </div>
    <div className="avatar">
      <Avatar
        image={client._user.image}
        name={client._user.fullName || client._user.id}
        size={44}
      />
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <FiLogOut style={{ width: '30px', height: '30px' }} />
      </div>
    </div>
  </div>
);

const CompanyHeader = ({ client }) => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
  IsCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleConatiner,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('userName');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} client={client} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader client={client} />
        <ChannelSearch setToggleConatiner={setToggleConatiner} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              IsCreating={IsCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleConatiner={setToggleConatiner}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
              setToggleConatiner={setToggleConatiner}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              IsCreating={IsCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleConatiner={setToggleConatiner}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
              setToggleConatiner={setToggleConatiner}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [ToggleConatiner, setToggleConatiner] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: ToggleConatiner ? '0%' : '-89%',
          backgroundColor: '#005fff',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleConatiner((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleConatiner={setToggleConatiner}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
