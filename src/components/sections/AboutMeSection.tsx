
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutMeSection() {
  return (
    <section id="about-me" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary font-headline">About Me</h2>
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/3 relative min-h-[300px] md:min-h-0">
              <Image
                src="https://storage.googleapis.com/c_iampowerbuilt_bucket/trainer-headshot-0-live.jpg"
                alt="Trainer Headshot"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                data-ai-hint="trainer portrait"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle className="text-3xl text-primary font-headline">Your Dedicated Fitness Partner</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-foreground/90 space-y-4">
                <p>
                  Welcome to @iampowerbuilt! I am a passionate and certified personal trainer dedicated to helping you unlock your full potential and achieve your fitness aspirations. My approach is rooted in science, personalized to your unique needs, and designed to deliver sustainable results.
                </p>
                <p>
                  Whether you're looking to build strength, lose weight, improve endurance, or simply adopt a healthier lifestyle, I provide the guidance, motivation, and expertise to make it happen. I believe fitness is a journey, not a destination, and I'm here to support you every step of the way.
                </p>
                <p>
                  My training philosophy emphasizes not just physical transformation but also mental well-being and building lasting healthy habits. Let's work together to build a stronger, healthier, and more confident you!
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
