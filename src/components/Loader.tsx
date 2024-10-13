import logoImg from '../assets/logo/logo.svg';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative flex items-center justify-center">
        {/* Spinner */}
        <div className="absolute border-t-4 border-b-4 border-blue-500 rounded-full h-24 w-24 animate-spin"></div>
        {/* Logo */}
        <img src={logoImg} alt="Loading..." className="h-12 w-12" />
      </div>
    </div>
  );
};

export default Loader;