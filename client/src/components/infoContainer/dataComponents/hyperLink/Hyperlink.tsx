import Axios from 'axios';
import { FC, useState } from 'react';
import { useGeneralLogic } from '../../../allContexts';

export const Hyperlink: FC = () => {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputHyperlink, setHyperlink] = useState<string>('');
  const [NewLinkPopup, setNewLinkPopup] = useState<boolean>(false);

  const { currentTask, setNewLink } = useGeneralLogic();

  const handleHyperlink = () => {
    setNewLinkPopup(false);

    Axios.post('/api/insertTaskLink', {
      taskID: currentTask.taskID,
      title: inputTitle,
      hyperlink: inputHyperlink,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not saved in db');
        } else {
          setNewLink({
            title: inputTitle,
            hyperlink: inputHyperlink,
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <li className='infoItem'>
        {currentTask.info.link === undefined ? (
          <button
            onClick={() => {
              setNewLinkPopup(true);
            }}>
            Add new link
          </button>
        ) : (
          <li>
            <a href={currentTask.info.link.hyperlink}>
              {currentTask.info.link.title}
            </a>
            {}
          </li>
        )}
      </li>
      {NewLinkPopup && (
        <div className='popup'>
          <input
            type='text'
            placeholder='Title'
            value={inputTitle}
            onChange={(event) => {
              setInputTitle(event.target.value);
            }}
          />
          <br />
          <input
            type='text'
            placeholder='link'
            value={inputHyperlink}
            onChange={(event) => {
              setHyperlink(event.target.value);
            }}
          />
          <div className='buttonsGrid'>
            <button onClick={handleHyperlink}> OK</button>
            <button
              onClick={() => {
                setNewLinkPopup(false);
              }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
