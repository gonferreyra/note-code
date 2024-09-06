import { useParams } from 'react-router-dom';
import MonacoEditor from './MonacoEditor';
import { useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import useStore from '../store/codeStore';
import Option from './Option';
import Button from './Button';
// import { useStore } from '';

export default function CodeComponent() {
  const [theme, setTheme] = useState('light');
  const { id } = useParams();
  const editorLanguage = useStore.use.editorLanguage();
  const handleLanguageChange = useStore.use.handleLanguageChange();

  const shareUrl = import.meta.env.VITE_BASE_SHARE_URL;

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

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
        <MonacoEditor id={id} theme={theme} />
      ) : (
        <MonacoEditor theme={theme} />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <select
            id="language"
            name="language"
            value={editorLanguage}
            className="cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold"
            onChange={(e) =>
              handleLanguageChange(e.target.value as 'html' | 'javascript')
            }
          >
            <Option value="html">HTML</Option>
            <Option value="javascript">JavaScript</Option>
          </select>
          <select
            id="theme"
            name="theme"
            onChange={(e) => handleThemeChange(e.target.value)}
            className="ml-2 cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold md:ml-4"
          >
            <Option value="light">Light</Option>
            <Option value="dark">VS Dark</Option>
          </select>
        </div>
        <div className="flex gap-6">
          {id && (
            <button
              className="flex items-center gap-2 text-sm font-semibold text-[#677489]"
              onClick={() => {
                navigator.clipboard.writeText(`${shareUrl}/${id}`);
                toast.success('Link copied to clipboard!');
              }}
            >
              <img src="/link.svg" alt="link-image" />
              {`.../${id.slice(-5)}`}
            </button>
          )}
          <Button />
        </div>
      </div>
    </main>
  );
}
