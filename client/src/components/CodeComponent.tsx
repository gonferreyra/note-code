import { useParams } from 'react-router-dom';
import MonacoEditor from './MonacoEditor';
import { useState } from 'react';
import clsx from 'clsx';

export default function CodeComponent() {
  const [theme, setTheme] = useState('light');
  const { id } = useParams();
  // console.log(id);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <main
      className={clsx(
        'xl:max-w-4xlcl mx-auto mt-6 max-w-2xl rounded-lg p-4 lg:max-w-3xl',
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

      <div className="flex items-end justify-between">
        <div>
          <select
            id="language"
            name="language"
            className="cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold"
          >
            <option>HTML</option>
          </select>
          <select
            id="theme"
            name="theme"
            // defaultValue={theme}
            onChange={({ target: { value } }) => handleThemeChange(value)}
            className="ml-4 cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold"
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
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-semibold text-[#677489]"
            >
              <img src="/link.svg" alt="link-image" />
              {`.../${id}`}
            </a>
          )}
          <button
            className="flex items-center justify-center gap-2 rounded-full bg-[#406aff] px-4 py-3 text-base font-semibold leading-none text-white disabled:bg-[#677489]"
            disabled={id ? true : false}
          >
            <img src="/Share.svg" alt="share-icon" className="h-4 w-4" />
            <span className="align-middle">Share</span>
          </button>
        </div>
      </div>
    </main>
  );
}
