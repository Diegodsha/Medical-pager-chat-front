import { useState, useEffect } from 'react';
import { ResultsDropdown } from './';
import { useChatContext } from 'stream-chat-react';
import { BiSearchAlt } from 'react-icons/bi';

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [Query, setQuery] = useState('');
  const [Loading, setLoading] = useState(false);
  const [TeamChannels, setTeamChannels] = useState([]);
  const [DirectChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!Query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [Query]);

  const getChannels = async (text) => {

    try {

      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <BiSearchAlt />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={Query}
          onChange={onSearch}
        />
      </div>
      {Query && (
        <ResultsDropdown
          TeamChannels={TeamChannels}
          DirectChannels={DirectChannels}
          Loading={Loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
