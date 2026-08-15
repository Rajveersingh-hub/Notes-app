import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addtopaste, Updatetopaste, Removetopaste, resetallpaste } from '../features/counterslice/counterslice';
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const paste = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const pastes = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredPastes = pastes.filter((item) => {
    const title = item.title || '';
    const content = item.Content || '';
    const query = searchTerm.toLowerCase();

    return (
      title.toLowerCase().includes(query) ||
      content.toLowerCase().includes(query)
    );
  });
  function handleview(item) {
    navigate(`/paste/${encodeURIComponent(item._ID)}`);
  }
  function handledlete(item) {
    dispatch(Removetopaste(item));
  }
  function handleUpdate(item) {
    navigate(`/?id=${encodeURIComponent(item._ID)}&title=${encodeURIComponent(item.title || '')}&content=${encodeURIComponent(item.Content || '')}`);
  }
  function handlereset() {
    if (window.confirm('Are you sure you want to reset all notes? This action cannot be undone.')) {
      dispatch(resetallpaste());
    }
  }
  function handlecopy(item) {
    const contentToCopy = item.Content || '';
    navigator.clipboard.writeText(contentToCopy)
      .then(() => { 
        toast.success('Note copied to clipboard!');
      });
  } 

  return (
    <div className='paste-shell'>
       <button onClick={() => handlereset()} className="action-btn reset-btn">
                  reset All notes
                </button>
      <div className='search-bar'>
        <input className='search-input' type="text" placeholder="Search notes..." onChange={(e) => setSearchTerm(e.target.value)} />
        <button className='cta-button secondary-button' type='button'>Search</button>
      </div>

      {searchTerm && (
        <div className={`search-status ${filteredPastes.length > 0 ? 'search-found' : 'search-not-found'}`}>
          {filteredPastes.length > 0 ? (
            <span className='search-status-text'>✓ {filteredPastes.length} result{filteredPastes.length !== 1 ? 's' : ''} found</span>
          ) : (
            <span className='search-status-text'>✗ No search results found</span>
          )}
        </div>
      )}

      <div className="paste-container">
        {filteredPastes.map((item) => (
          <div className="note-card" key={item._ID}>
            <div className='note-header'>
              <h3>{item.title}</h3>
              <div className="note-actions">
                <button onClick={() => handleview(item)} className="action-btn add-btn">
                  View 
                </button>
                <button onClick={() => handlecopy(item)} className="action-btn add-btn">
                  copy
                </button>
                <button onClick={() => handleUpdate(item)} className="action-btn update-btn">
                  update
                </button>
                <button onClick={() => handledlete(item)} className="action-btn delete-btn">
                  delete
                </button>
              </div>
            </div>
            <p className='note-content'>{item.Content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default paste