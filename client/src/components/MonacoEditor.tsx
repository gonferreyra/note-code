import Editor from '@monaco-editor/react';
import { useQuery } from '@tanstack/react-query';
import type { Code } from '../lib/types';
import { sleep } from '../lib/utils';
import { defaultHtmlValue } from '../lib/constants';
import { useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';

type MonacoEditorProps = {
  id?: string;
  theme: string;
  handleEditorCodeChange: (code: string) => void;
  language: 'html' | 'javascript';
  handleEditorlanguageChange: (value: 'html' | 'javascript') => void;
  isManualChange: boolean;
};

export default function MonacoEditor({
  id,
  theme,
  handleEditorCodeChange,
  language,
  handleEditorlanguageChange,
  isManualChange,
}: MonacoEditorProps) {
  // TODO:
  // - Validar que el id exista!! Esto lo vamos a hacer cuando creemos la API

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const fetchSharedCode = async (id: string) => {
    await sleep(2000);
    const response = await fetch(`${apiUrl}/users?id=${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();

    return {
      code: data.map((code: Code) => code.code),
      language: data.map((code: Code) => code.language),
    };
  };

  const {
    isLoading,
    data: code,
    // error,
  } = useQuery({
    queryKey: ['code', id],
    queryFn: () => fetchSharedCode(id!),
    enabled: !!id, // Se ejecuta el query si existe id
  });

  useEffect(() => {
    if (id && code?.language[0] && !isManualChange) {
      handleEditorlanguageChange(code.language[0] as 'html' | 'javascript');
    }
  }, [id, code, handleEditorlanguageChange, isManualChange]);

  const editorOptions = {
    scrollBeyondLastLine: false,
    glyphMargin: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 2,
    wordWrap: 'on' as 'on',
    scrollbar: {
      horizontal: 'hidden' as 'hidden',
    },
  };

  const defaultValue = id ? (code ? code?.code[0] : '') : defaultHtmlValue;

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Triangle color="rgba(116, 62, 228, 1)" />
      </div>
    );
  }

  return (
    <Editor
      height={'500px'}
      loading={true}
      width={'100%'}
      language={language}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      options={editorOptions}
      value={defaultValue}
      onChange={(value) => handleEditorCodeChange(value || '')}
    />
  );
}
