import { Loader2 } from "lucide-react";

export function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin text-muted-foreground" size={size} />
    </div>
  );
}
