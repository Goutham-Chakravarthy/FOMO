export default function Home() {
  return (
    <div id="home" className="min-h-screen w-full flex items-center justify-center bg-black px-4 sm:px-6 scroll-mt-24">
      <div className="text-center space-y-4 sm:space-y-5 max-w-4xl relative z-50 w-full">
        <p className="py-1 px-3 sm:px-2 bg-zinc-900/40 backdrop-blur-sm font-light rounded-full text-white inline-block text-sm sm:text-base">
          Get Started — It's Fast & Affordable
        </p>
        <div className="space-y-2 sm:space-y-3">
          <h6 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 text-transparent font-semibold leading-tight">
            <span className="block whitespace-nowrap">Your Ideas Deserve More</span>
            <span className="block whitespace-nowrap">Figure Out Your Options with FOMO</span>
          </h6>
        </div>
        <p className="text-gray-400 text-base sm:text-lg text-pretty px-2 sm:px-0">
          Welcome to FOMO — your student-first squad for affordable academic help. We whip up lit projects, reports, and PowerPoint presentations tailored to your subject and deadline. With clean structure and extra polish, we take the stress out of crunch time. Join students vibing with stress-free submissions. Ready to make deadlines less chaotic?
        </p>
      </div>
    </div>
  );
}