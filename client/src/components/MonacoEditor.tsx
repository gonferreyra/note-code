import Editor from '@monaco-editor/react';

import { defaultHtmlValue } from '../lib/constants';
import { useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useCodeState } from '../store/codeStore';
import { useCodeQuery } from '../lib/hooks';

type MonacoEditorProps = {
  id?: string;
  theme: string;
};

export default function MonacoEditor({ id, theme }: MonacoEditorProps) {
  // TODO:
  // - Validar que el id exista!! Esto lo vamos a hacer cuando creemos la API
  const editorLanguage = useCodeState((state) => state.editorLanguage);
  const setEditorCode = useCodeState((state) => state.setEditorCode);
  const setEditorLanguage = useCodeState((state) => state.setEditorLanguage);
  const manualEditorLanguage = useCodeState(
    (state) => state.manualEditorLanguage,
  );

  const { isLoading, code } = useCodeQuery(id || '');

  useEffect(() => {
    if (id && code?.language[0] && !manualEditorLanguage) {
      setEditorLanguage(code.language[0] as 'html' | 'javascript');
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
      language={editorLanguage}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      options={editorOptions}
      value={defaultValue}
      onChange={(value) => setEditorCode(value || '')}
    />
  );
}
