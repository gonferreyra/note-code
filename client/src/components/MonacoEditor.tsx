import Editor from '@monaco-editor/react';
import { useQuery } from '@tanstack/react-query';

type MonacoEditorProps = {
  id?: string;
  theme: string;
};

export default function MonacoEditor({ id, theme }: MonacoEditorProps) {
  const fetchCode = async () => {
    const response = await fetch('http://localhost:3000/users');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();

    return data;
  };

  const fetchSharedCode = async (id: string) => {
    const response = await fetch(`http://localhost:3000/users?id=${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    const data = await response.json();
    const extractedCode = data.map((code) => code.code);

    return extractedCode;
  };

  const {
    isLoading,
    data: code,
    error,
  } = useQuery({
    queryKey: ['code', id],
    queryFn: () => fetchSharedCode(id!),
  });

  if (isLoading) return <div>Loading...</div>;

  const editorOptions = {
    // minimap: { enabled: false },
    scrollBeyondLastLine: false,
    glyphMargin: false, // Desactiva el margen para glifos (como breakpoints)
    // folding: false, // Desactiva la posibilidad de plegar código
    lineDecorationsWidth: 0, // Reduce el espacio reservado para decoraciones de línea
    lineNumbersMinChars: 2, // Reduce el espacio reservado para los números de línea
    wordWrap: 'on' as 'on', // Habilita el ajuste de palabras para evitar la barra de desplazamiento horizontal
    scrollbar: {
      horizontal: 'hidden' as 'hidden', // Oculta la barra de desplazamiento horizontal
    },
  };

  let defaultValue;
  if (!id) {
    defaultValue = `<html>
  <head>
    <title>Enter a title</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample");
    </script>
  </head>
  <body>
    <!-- Write your HTML code here -->
  </body>
</html>`;
  } else {
    defaultValue = `${code}`;
  }

  return (
    <Editor
      height={'500px'}
      width={'100%'}
      defaultLanguage="html"
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      loading={'loading...'}
      options={editorOptions}
      defaultValue={defaultValue}
    />
  );
}
