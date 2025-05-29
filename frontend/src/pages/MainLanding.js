import Link from "next/link";

export default function MainLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 flex flex-col items-center justify-center px-6 py-20">
      {/* Header */}
      <h1 className="text-5xl font-bold text-nextsetAccent tracking-tight mb-6 text-center">
        Join the NextSet Movement
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-xl mb-12">
        Whether you’re an{" "}
        <span className="font-semibold text-nextsetAccent">Artist</span> ready
        to perform or a{" "}
        <span className="font-semibold text-nextsetAccent">Venue</span> eager to
        host, we make collaboration easy.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <LandingCard
          title="🎵 Artist"
          description="Find venues, pitch your shows, and get booked with ease."
          href="/register/artist"
          buttonText="Sign Up as Artist"
          color="nextsetAccent"
        />
        <LandingCard
          title="🏢 Venue"
          description="List your venue, discover talent, and manage bookings."
          href="/register/venue"
          buttonText="Sign Up as Venue"
          color="teal-600"
        />
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-600 mt-12">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-nextsetAccent hover:underline font-medium"
        >
          Log in here
        </Link>
      </p>
    </main>
  );
}

type LandingCardProps = {
  title: string,
  description: string,
  href: string,
  buttonText: string,
  color: string,
};

function LandingCard({
  title,
  description,
  href,
  buttonText,
  color,
}: LandingCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white shadow-md rounded-2xl p-8 transition-transform duration-300 hover:shadow-xl hover:scale-[1.03]">
        <h2
          className={`text-3xl font-bold text-gray-900 group-hover:text-${color}`}
        >
          {title}
        </h2>
        <p className="text-gray-600 mt-4">{description}</p>
        <button
          className={`mt-6 px-6 py-2 rounded-full text-white bg-${color} hover:opacity-90 transition`}
        >
          {buttonText}
        </button>
      </div>
    </Link>
  );
}
