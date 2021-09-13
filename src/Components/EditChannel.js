import { useState } from "react"
import { useChatContext } from 'stream-chat-react'
import { UserList } from './'
import { CloseCreateChannel } from "../assets"


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

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext()
    const [ChannelName, setChannelName] = useState(channel?.data?.name)
    const [SelectedUsers, setSelectedUsers] = useState([])

    const updateChannel = async (e) => {
        e.preventDefault()
        const nameChanged = ChannelName !== (channel.data.name || channel.data.id)

        if (nameChanged) {
            await channel.update({ name: ChannelName }, { text: `Channel name changed to ${ChannelName}` })
        }

        if (SelectedUsers.length) {
            await channel.addMembers(SelectedUsers)
        }

        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([])
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput ChannelName={ChannelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel
