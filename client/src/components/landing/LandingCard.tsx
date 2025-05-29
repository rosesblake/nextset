import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LandingCardProps = {
  title: string;
  description: string;
  href: string;
  buttonText: string;
};

export function LandingCard({
  title,
  description,
  href,
  buttonText,
}: LandingCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="transition-transform hover:scale-[1.03] hover:shadow-xl cursor-pointer">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4">{description}</p>
          <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/70 cursor-pointer">
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
