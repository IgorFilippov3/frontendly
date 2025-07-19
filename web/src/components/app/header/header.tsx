import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white">
      <div className="text-2xl font-bold text-gray-900">Frontendly</div>
      <div className="flex items-center gap-4">
        <Button variant="outline">Log in</Button>
        <Button>Become a creator</Button>
      </div>
    </nav>
  );
};
