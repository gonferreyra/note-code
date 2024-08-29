export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center gap-8">
      <div>
        <img src="/NoteCodeLogo.svg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">Create & Share</h1>
        <h1 className="text-4xl font-semibold">Your Code easily</h1>
      </div>
    </header>
  );
}
