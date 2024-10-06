import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} TalkNow. All rights reserved.</p>  {/* Replace "FitSync" with your app name */}
      </div>
    </footer>
  );
}

export default Footer;
