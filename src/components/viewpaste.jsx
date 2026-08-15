import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const viewpaste = () => {
  const pastes = useSelector((state) => state.paste.paste);
  const { id } = useParams();
  
  // Decode the ID and find the matching paste
  const decodedID = decodeURIComponent(id);
  const paste = pastes.find((p) => p._ID === decodedID);

  return (
    <div className='paste-shell view-paste-container view-mode-disabled'>
      <div className='view-paste-header'>
        <h1 className='view-paste-title'>{paste?.title || 'Note Not Found'}</h1>
        <div className='view-mode-badge'>View Mode</div>
      </div>
      
      {paste ? (
        <div className='view-paste-content-area'>
          <div className='paste-meta-info'>
            <span className='paste-id'> {paste.title}</span>
          </div>
          <div className='paste-content-wrapper'>
            <p className='paste-content-text'>{paste.Content}</p>
          </div>
        </div>
      ) : (
        <div className='no-paste-found'>
          <p>No paste found with this ID</p>
        </div>
      )}
    </div>
  )
}

export default viewpaste