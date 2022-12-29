import { FC, useState } from 'react';
import { useGeneralLogic } from '../../../allContexts';

export const Note: FC = () => {
  const { currentTask, setNewNote } = useGeneralLogic();
  const [NewNotePopup, setNewNotePopup] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [contentPopUp, setContentPopUp] = useState<boolean>(false);
  const handleNewNote = () => {
    setNewNotePopup(false);
    setNewNote({ title: noteTitle, content: noteText });
  };
  return (
    <div>
      {currentTask.info.note === undefined ? (
        <button onClick={() => setNewNotePopup(true)}>Add new note</button>
      ) : (
        <div
          className='item_note infoItem'
          onClick={() => setContentPopUp(!contentPopUp)}>
          {currentTask.info.note.title}
          {contentPopUp && <div>{currentTask.info.note.content}</div>}
        </div>
      )}
      {NewNotePopup && (
        <div className='popup_note'>
          <input
            type='text'
            placeholder='Title'
            value={noteTitle}
            onChange={(event) => setNoteTitle(event.target.value)}
          />
          <textarea
            onChange={(event) => {
              setNoteText(event.target.value);
            }}></textarea>
          <button onClick={handleNewNote}>OK</button>
          <button onClick={() => setNewNotePopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
