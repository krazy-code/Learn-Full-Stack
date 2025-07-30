function LoadingFull({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-lg font-semibold text-black">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingFull;
