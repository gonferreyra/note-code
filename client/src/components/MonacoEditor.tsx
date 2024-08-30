import Editor from '@monaco-editor/react';

type MonacoEditorProps = {
  id?: string;
  theme: string;
};

export default function MonacoEditor({ id, theme }: MonacoEditorProps) {
  // console.log(id);
  const editorOptions = {
    minimap: { enabled: false },
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

  const defaultValue = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

  return (
    <Editor
      height={'500px'}
      width={'100%'}
      defaultLanguage="html"
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      loading={'loading...'}
      options={editorOptions}
      defaultValue={id ? undefined : defaultValue}
    />
  );
}
