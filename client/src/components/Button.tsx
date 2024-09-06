import { useEffect, useState } from 'react';
import { useCodeState } from '../store/codeStore';

export default function Button() {
  const handleShare = useCodeState((state) => state.handleShare);
  const editorCode = useCodeState((state) => state.editorCode);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (editorCode !== '') {
      setDisabledBtn(false);
    }
  }, [editorCode]);

  return (
    <button
      className="flex items-center justify-center gap-2 rounded-full bg-[#406aff] px-4 py-3 text-base font-semibold leading-none text-white disabled:bg-[#677489]"
      disabled={disabledBtn}
      onClick={handleShare}
    >
      <img src="/Share.svg" alt="share-icon" className="h-4 w-4" />
      <span className="align-middle">Share</span>
    </button>
  );
}
