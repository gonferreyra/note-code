import Editor from '@monaco-editor/react';

export default function CodeComponent() {
  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    glyphMargin: false, // Desactiva el margen para glifos (como breakpoints)
    // folding: false, // Desactiva la posibilidad de plegar código
    lineDecorationsWidth: 0, // Reduce el espacio reservado para decoraciones de línea
    lineNumbersMinChars: 2, // Reduce el espacio reservado para los números de línea
    wordWrap: 'on', // Habilita el ajuste de palabras para evitar la barra de desplazamiento horizontal
    scrollbar: {
      horizontal: 'hidden', // Oculta la barra de desplazamiento horizontal
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
    <main className="mx-auto mt-6 max-w-2xl rounded-lg bg-white p-4 lg:max-w-3xl xl:max-w-4xl">
      <Editor
        height={'500px'}
        width={'100%'}
        defaultLanguage="html"
        theme={'vs-light'}
        loading={'loading...'}
        options={editorOptions}
        defaultValue={defaultValue}
      />

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
            className="ml-4 cursor-pointer rounded-full border-r-8 border-[#ced6e1] bg-[#ced6e1] px-4 py-2 text-[10px] font-semibold"
          >
            <option className="font-semibold">Light</option>
            <option>Dark</option>
          </select>
        </div>
        <div>
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#406aff] px-4 py-3 text-base font-semibold leading-none text-white">
            <img src="/Share.svg" alt="share-icon" className="h-4 w-4" />
            <span className="align-middle">Share</span>
          </button>
        </div>
      </div>
    </main>
  );
}
