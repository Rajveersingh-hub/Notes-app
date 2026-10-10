import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const loadPastes = () => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('paste');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load pastes from localStorage:', error);
    return [];
  }
};

const initialState = {
  paste: loadPastes(),
};

const hasContent = (paste) =>
  typeof paste?.Content === 'string' && paste.Content.trim().length > 0;

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtopaste:(state,action) => {
      const newPaste = action.payload;
      if (!hasContent(newPaste)) {
        toast.error('Paste content cannot be empty!', { position: 'top-right' });
        return;
      }

      state.paste = [...state.paste, newPaste];

      try {
        localStorage.setItem('paste', JSON.stringify(state.paste));
      } catch (error) {
        console.error('Failed to save paste to localStorage:', error);
      }

      toast.success('Paste added successfully!', { position: 'top-right' });
    },
    Updatetopaste:(state,action) => {
      const updatedPaste = action.payload;
      if (!hasContent(updatedPaste)) {
        toast.error('Paste content cannot be empty!', { position: 'top-right' });
        return;
      }

      const index = state.paste.findIndex(paste => paste._ID === updatedPaste._ID);
      if (index !== -1) {
        state.paste[index] = updatedPaste;

        try {
          localStorage.setItem('paste', JSON.stringify(state.paste));
        } catch (error) {
          console.error('Failed to save paste to localStorage:', error);
        }

        toast.success('Paste updated successfully!', { position: 'top-right' });
      }
    },
    Removetopaste:(state,action) => {
      const payload = action.payload;
      const id = typeof payload === 'string' || typeof payload === 'number'
        ? payload
        : payload?._ID;

      if (id === undefined || id === null) {
        return;
      }

      const index = state.paste.findIndex(paste => paste._ID === id);
      if (index >=0) {
        state.paste.splice(index, 1);
        try {
          localStorage.setItem('paste', JSON.stringify(state.paste));
        } catch (error) {
          console.error('Failed to save paste to localStorage:', error);
        }

        toast.success('Paste removed successfully!', { position: 'top-right' });
      }
    },
    resetallpaste: (state, action) => {
      state.paste = [];
      try {
        localStorage.setItem('paste', JSON.stringify(state.paste));
      } catch (error) {
        console.error('Failed to save paste to localStorage:', error);
      }
      toast.success('All pastes reset successfully!', { position: 'top-right' });
    },
  },
})

// Action creators are generated for each case reducer function
export const {addtopaste,Updatetopaste,Removetopaste,resetallpaste } = pasteSlice.actions

export default pasteSlice.reducer