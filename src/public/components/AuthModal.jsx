import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isModalOpen, onClose }) => {
  const [authType, setAuthType] = useState("login");

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  const handleLoginSuccess = () => {
    onClose(); // Close modal after successful login
  };

  return (
    <div className="font-sans">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {authType === "login" ? "Login" : "Create Account"}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              {authType === "login" ? (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              ) : (
                <RegisterForm />
              )}

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {authType === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    onClick={toggleAuthType}
                    className="ml-2 text-orange-600 hover:text-orange-800 font-medium"
                  >
                    {authType === "login" ? "Register" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;