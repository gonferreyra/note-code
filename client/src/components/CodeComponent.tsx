import { useParams } from 'react-router-dom';
import MonacoEditor from './MonacoEditor';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function CodeComponent() {
  // TODO: enviar la url a .env
  const [theme, setTheme] = useState('light');
  const [editorCode, setEditorCode] = useState('');
  const [editorLenguage, setEditorLenguage] = useState<'html' | 'javascript'>(
    'html',
  );
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { id } = useParams();
  // console.log(id);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const shareUrl = import.meta.env.VITE_BASE_SHARE_URL;

  const handleEditorCodeChange = (code: string) => {
    setEditorCode(code);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleEditorLenguageChange = (value: 'html' | 'javascript') => {
    setEditorLenguage(value);
  };

  const handleShare = async () => {
    const newId = uuidv4();
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newId,
        code: editorCode,
      }),
    });

    if (response.ok) {
      window.location.href = `${shareUrl}/${newId}`;
    }
  };

  useEffect(() => {
    if (editorCode !== '') {
      setDisabledBtn(false);
    }
  }, [editorCode]);

  return (
    <main
      className={clsx(
        'xl:max-w-4xlcl mx-auto mt-6 max-w-2xl rounded-lg p-4 lg:max-w-3xl xl:max-w-5xl',
        {
          'bg-[#1e1e1e]': theme === 'dark',
          'bg-white': theme === 'light',
        },
      )}
    >
      {id ? (
        <MonacoEditor
          id={id}
          theme={theme}
          handleEditorCodeChange={handleEditorCodeChange}
          lenguage={editorLenguage}
          handleEditorLenguageChange={handleEditorLenguageChange}
        />
      ) : (
        <MonacoEditor
          theme={theme}
          handleEditorCodeChange={handleEditorCodeChange}
          lenguage={editorLenguage}
          handleEditorLenguageChange={handleEditorLenguageChange}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <select
            id="language"
            name="language"
            value={editorLenguage}
            className="cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold"
            onChange={(e) =>
              handleEditorLenguageChange(
                e.target.value as 'html' | 'javascript',
              )
            }
          >
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
          </select>
          <select
            id="theme"
            name="theme"
            onChange={({ target: { value } }) => handleThemeChange(value)}
            className="ml-2 cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold md:ml-4"
          >
            <option className="font-semibold" value="light">
              Light
            </option>
            <option className="font-semibold" value="dark">
              VS Dark
            </option>
          </select>
        </div>
        <div className="flex gap-6">
          {id && (
            <button
              className="flex items-center gap-2 text-sm font-semibold text-[#677489]"
              onClick={() => {
                navigator.clipboard.writeText(`http://localhost:5173/${id}`);
                toast.success('Link copied to clipboard!');
              }}
            >
              <img src="/link.svg" alt="link-image" />
              {`.../${id.slice(-5)}`}
            </button>
          )}
          <button
            className="flex items-center justify-center gap-2 rounded-full bg-[#406aff] px-4 py-3 text-base font-semibold leading-none text-white disabled:bg-[#677489]"
            disabled={disabledBtn}
            onClick={handleShare}
          >
            <img src="/Share.svg" alt="share-icon" className="h-4 w-4" />
            <span className="align-middle">Share</span>
          </button>
        </div>
      </div>
    </main>
  );
}
