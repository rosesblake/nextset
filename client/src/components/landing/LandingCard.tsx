import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type LandingCardProps = {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  imageSrc?: string;
};

export function LandingCard({
  title,
  description,
  href,
  buttonText,
  imageSrc,
}: LandingCardProps) {
  return (
    <Link
      href={href}
      className="group block w-full h-full focus:outline-none focus-visible:outline-none"
    >
      <div className="max-w-md mx-auto h-full flex flex-col overflow-hidden rounded-3xl bg-white transition duration-300 ease-in-out transform group-hover:scale-[1.03]">
        {imageSrc && (
          <div className="relative w-full h-40 shrink-0">
            <Image
              src={imageSrc}
              alt={`${title} visual`}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-1 p-5 md:p-6 text-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">{description}</p>
          </div>

          <Button className="mt-6 w-fit mx-auto bg-primary text-primary-foreground hover:bg-primary/70 focus:outline-none focus-visible:outline-none border-none">
            {buttonText}
          </Button>
        </div>
      </div>
    </Link>
  );
}
