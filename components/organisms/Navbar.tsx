import Link from "next/link";
import { LogoutButton } from "@/components/organisms/LogoutButton";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="text-lg font-bold">
          Task Tracker
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}