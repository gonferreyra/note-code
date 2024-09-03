import { Outlet } from 'react-router-dom';
// import CodeComponent from './components/CodeComponent';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className="absolute top-0 -z-10 h-[70vh] w-full bg-bg-image bg-cover bg-center bg-no-repeat" />

      <div className="container mx-auto px-4 py-6">
        <Header />

        {/* <CodeComponent /> */}
        <Outlet />
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
