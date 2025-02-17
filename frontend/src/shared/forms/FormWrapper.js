import React from "react";

const FormWrapper = ({ children, title, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 text-center">{title}</h1>
      <div className="space-y-4">{children}</div>
    </form>
  );
};

export { FormWrapper };
