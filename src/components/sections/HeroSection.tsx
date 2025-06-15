
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center">
      <Image
        src="https://storage.googleapis.com/c_iampowerbuilt_bucket/personal-training-0-live.jpg"
        alt="Personal Training Session"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority
        className="brightness-75"
        data-ai-hint="fitness workout"
      />
      <div className="relative z-10 p-8 bg-black/50 rounded-lg shadow-xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-headline animate-fade-in-down">
          Transform Your Fitness
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up">
          Achieve your goals with personalized training and AI-powered guidance.
        </p>
        <a
          href="#ai-assistant"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Ask Our AI Coach
        </a>
      </div>
    </section>
  );
}
