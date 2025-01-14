function ErrorDisplay({ errors }) {
  if (!Array.isArray(errors) || errors.length === 0) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
      {errors.map((error, idx) => (
        <p key={idx} className="text-sm">
          {error.param ? `${error.param}: ${error.msg}` : error.msg}
        </p>
      ))}
    </div>
  );
}

export { ErrorDisplay };
