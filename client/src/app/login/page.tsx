import { Login } from "@/features/auth/pages/Login";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <div className="w-full max-w-md">
        <Login />
      </div>
    </div>
  );
}
