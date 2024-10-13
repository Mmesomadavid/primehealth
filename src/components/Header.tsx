import logo from '../assets/logo/logo2.svg'; // Adjust the path to your logo image

const Header = () => {
  return (
    <div className="flex items-center">
      {/* Back Icon with Circle Background */}
      {/* Header Logo */}
      <img 
        src={logo} 
        alt="Logo" 
        width={180} 
        height={180} 
        className="object-contain" 
      />
    </div>
  );
}

export default Header;
