import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="https://i.ibb.co/X3dzmdh/pngwing-com-1.png"
        alt="Error Illustration"
        className="w-1/2 h-auto mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
      <p className="text-xl text-gray-600 mb-4">
        It looks like you've reached a page that doesn't exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Go back to the homepage
      </a>
    </div>
  );
};

export default ErrorPage;
