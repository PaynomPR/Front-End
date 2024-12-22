const LoadingOverlay = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
