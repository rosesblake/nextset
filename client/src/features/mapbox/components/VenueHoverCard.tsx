import { Venue } from "@/types/Venue";

type Props = {
  venue: Venue;
  coords: { x: number; y: number };
};

export function VenueHoverCard({ venue, coords }: Props) {
  const imageSrc = "/images/hero.png";

  return (
    <div
      className="absolute z-50 w-64 rounded-xl bg-white shadow-xl border border-zinc-200 p-4 text-sm pointer-events-none transition-all"
      style={{
        left: coords.x - 128,
        top: coords.y,
      }}
    >
      <div className="w-full h-32 overflow-hidden rounded-md mb-3">
        <img
          src={imageSrc}
          alt={venue.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="font-semibold text-zinc-800 truncate">{venue.name}</div>
      <div className="text-zinc-500 text-sm mb-1">
        {venue.city}, {venue.state}
      </div>

      {venue.capacity && (
        <div className="text-zinc-600">
          <span className="font-medium">Capacity:</span> {venue.capacity}
        </div>
      )}
    </div>
  );
}
