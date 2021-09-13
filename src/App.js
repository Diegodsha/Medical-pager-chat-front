import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer, ChannelContainer, Auth } from './Components';
import 'stream-chat-react/dist/css/index.css';
import './App.css';


const cookies = new Cookies();
const apiKey = 'nq35hvvsqyxr';
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const App = () => {
  const [CreateType, setCreateType] = useState('');
  const [IsCreating, setIsCreating] = useState(false);
  const [IsEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          IsCreating={IsCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          IsCreating={IsCreating}
          setIsCreating={setIsCreating}
          IsEditing={IsEditing}
          setIsEditing={setIsEditing}
          CreateType={CreateType}
        />
      </Chat>
    </div>
  );
};

export default App;
