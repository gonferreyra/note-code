import { create } from 'zustand';

import { v4 as uuidv4 } from 'uuid';
import createSelectors from './selectors';

type CodeState = {
  editorCode: string;
  editorLanguage: 'html' | 'javascript';
  manualEditorLanguage: boolean;
  setEditorCode: (code: string) => void;
  setEditorLanguage: (value: 'html' | 'javascript') => void;
  handleLanguageChange: (value: 'html' | 'javascript') => void;
  handleShare: () => void;
};

const apiUrl = import.meta.env.VITE_BASE_API_URL;
const shareUrl = import.meta.env.VITE_BASE_SHARE_URL;

const useCodeState = create<CodeState>()((set, get) => ({
  editorCode: '',
  editorLanguage: 'html',
  manualEditorLanguage: false,
  // setter functions
  setEditorCode: (code: string) =>
    set((state) => ({ ...state, editorCode: code })),
  setEditorLanguage: (value: 'html' | 'javascript') => {
    set((state) => ({
      ...state,
      editorLanguage: value,
    }));
  },
  handleLanguageChange: (value: 'html' | 'javascript') => {
    set((state) => ({
      ...state,
      editorLanguage: value,
      manualEditorLanguage: true,
    }));
  },
  // fetcher functions
  handleShare: async () => {
    const newId = uuidv4();
    const response = await fetch(`${apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newId,
        code: get().editorCode,
        language: get().editorLanguage,
      }),
    });
    if (response.ok) {
      window.location.href = `${shareUrl}/${newId}`;
    }
  },
}));

export default createSelectors(useCodeState);
