import React from "react";

const EmailSMSDropdown = () => {
  return (
    <div className="absolute mt-2 w-48 bg-blue-600 bg-opacity-90 text-gray-50 rounded shadow-lg">
      <ul className="py-1">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-blue-800">
            Email
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-blue-800">
            SMS via Modem
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-blue-800">
            SMS via Server
          </a>
        </li>
      </ul>
    </div>
  );
};

export default EmailSMSDropdown;
