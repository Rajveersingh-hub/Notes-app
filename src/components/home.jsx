import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addtopaste, Updatetopaste } from '../features/counterslice/counterslice.jsx'

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteID = searchParams.get("id");
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pasteID) {
      setTitle(searchParams.get("title") || "");
      setValue(searchParams.get("content") || "");
    } else {
      setTitle("");
      setValue("");
    }
  }, [pasteID, searchParams]);

  function createpaste() {
    const paste = {
      title,
      Content: value,
      _ID: pasteID || Date.now().toString(25),
      createdAt: new Date().toISOString(),
    };

    if (pasteID) {
      dispatch(Updatetopaste(paste));
    } else {
      dispatch(addtopaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className='home-panel'>
      <div className='home-form'>
        <div className='title-row'>
          <input
            className='title-input'
            type="text"
            placeholder="Enter Title here.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createpaste} className='cta-button primary-button'>
            {pasteID ? "Update" : "Create"}
          </button>
        </div>

        <textarea
          className='content-textarea'
          name="write here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id=""
          placeholder="Write your note..."
        ></textarea>
      </div>
    </div>
  )
}

export default Home