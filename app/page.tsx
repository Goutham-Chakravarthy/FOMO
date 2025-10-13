export default function Home() {
  return (
    <div id="home" className="min-h-screen w-full flex items-center justify-center bg-black px-4 sm:px-6 scroll-mt-24">
      <div className="text-center space-y-4 sm:space-y-5 max-w-4xl z-10 w-full">
        <p className="py-1 px-3 sm:px-2 bg-zinc-900/40 backdrop-blur-sm font-light rounded-full text-white inline-block text-sm sm:text-base">
          Join 7,000+ Users
        </p>
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 text-transparent font-semibold leading-tight">
            Modern UI Library
          </h1>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 text-transparent font-semibold leading-tight">
            For Web Developers
          </h3>
        </div>
        <p className="text-gray-400 text-base sm:text-lg text-pretty px-2 sm:px-0">
          100+ <span className="bg-clip-text bg-gradient-to-r from-purple-500 to-rose-500 text-transparent font-semibold">free</span> and open-source modern ui components made with React, TailwindCSS and Framer Motion. Perfect for easily designing modern web apps.
        </p>
      </div>
    </div>
  );
}