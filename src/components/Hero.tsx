import React from 'react';
import image1 from '../assets/cog.png';
import image2 from '../assets/cylinder.png'
import image3 from '../assets/noodle.png';
import image4 from '../assets/pyramid.png';
import image5 from '../assets/spring.png';
import image6 from '../assets/star.png';
import image7 from '../assets/tube.png';
import productImg from '../assets/product-image.png'
const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="mt-8 sm:mt-12 relative">
          <div className="inline-flex items-center bg-transparent rounded-full px-4 py-2 shadow-lg relative z-20">
            <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25zm0 3v3.75h.008v.008H12v-3.758z" />
            </svg>
            <span className="text-sm font-medium  text-gray-900">Prime Health 1.0</span>
          </div>
          
          {/* Scattered images */}
          <div className="absolute inset-0 -z-10">
            <img 
              src={image1} 
              alt="Decorative image" 
              className="absolute top-[-10%] left-[5%] w-40 h-40 object-contain opacity-50 animate-float"
              style={{animationDelay: '0s'}}
            />

            <img 
              src={image2} 
              alt="Decorative image" 
              className="absolute top-[80%] left-[95%] w-48 h-48 object-contain opacity-50 animate-float"
              style={{animationDelay: '1s'}}
            />
            <img 
              src={image3} 
              alt="Decorative image" 
              className="absolute top-[90%] left-[15%] w-48 h-48 object-contain opacity-50 animate-float"
              style={{animationDelay: '1s'}}
            />
            <img 
              src={image4} 
              alt="Decorative image" 
              className="absolute bottom-[80%] right-[18%] w-44 h-44 object-contain opacity-50 animate-float"
              style={{animationDelay: '2s'}}
            />
            <img 
              src={image5} 
              alt="Decorative image" 
              className="absolute top-[70%] right-[95%] w-36 h-36 object-contain opacity-50 animate-float"
              style={{animationDelay: '3s'}}
            />
            <img 
              src={image6} 
              alt="Decorative image" 
              className="absolute bottom-[70%] left-[85%] w-36 h-36 object-contain opacity-50 animate-float"
              style={{animationDelay: '3s'}}
            />
            <img 
              src={image7} 
              alt="Decorative image" 
              className="absolute top-[90%] left-[75%] w-36 h-36 object-contain opacity-50 animate-float"
              style={{animationDelay: '3s'}}
            />
          </div>

          <h1 className="mt-4 text-4xl font-medium text-gray-800 tracking-tight sm:text-5xl md:text-6xl lg:text-7xl relative z-10">
            Empower<br />
            HealthCare with Prime Care<br />
            Technology & AI Features
          </h1>
        </div>

         {/* Dashboard Preview */}
         <div className="mt-16 sm:mt-24 relative mx-auto max-w-6xl">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={productImg}
              alt="PrimeHealth Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

