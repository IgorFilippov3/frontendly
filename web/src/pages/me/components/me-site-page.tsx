import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SitePageProps {
  children: ReactNode;
  className?: string;
  backUrl?: string;
}

export const MeSitePage = ({ children, className, backUrl }: SitePageProps) => {
  const navigate = useNavigate();

  const routeBack = (url: string) => {
    navigate(url);
  };

  return (
    <div className={`px-6 py-10 md:px-12 lg:px-20 ${className}`}>
      {backUrl && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => routeBack(backUrl)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};
