import Editor from '@monaco-editor/react';

import { defaultHtmlValue } from '../lib/constants';
import { useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import useStore from '../store/codeStore';
import { useCodeQuery } from '../lib/hooks';

type MonacoEditorProps = {
  id?: string;
  theme: string;
};

export default function MonacoEditor({ id, theme }: MonacoEditorProps) {
  const editorLanguage = useStore.use.editorLanguage();
  const setEditorCode = useStore.use.setEditorCode();
  const setEditorLanguage = useStore.use.setEditorLanguage();
  const manualEditorLanguage = useStore.use.manualEditorLanguage();

  const { isLoading, code } = useCodeQuery(id || '');

  // console.log(code);

  useEffect(() => {
    if (id && code?.language && !manualEditorLanguage) {
      setEditorLanguage(code.language as 'html' | 'javascript');
    }
  }, [id, code, setEditorLanguage, manualEditorLanguage]);

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

  const defaultValue = id ? (code ? code.code : '') : defaultHtmlValue;

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
      language={editorLanguage}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      options={editorOptions}
      value={defaultValue}
      onChange={(value) => setEditorCode(value || '')}
    />
  );
}
