import Lottie from 'lottie-react';
import animationData from '../assets/animations/loader.json'; // Make sure this path is correct

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 w-screen overflow-hidden">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
      />
      <span className='flex w-4 h-[2px] rounded-full slideLoad bg-[#106fff]'></span>
    </div>
  );
};

export default Loader;
