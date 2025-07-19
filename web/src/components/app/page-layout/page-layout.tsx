import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  backUrl?: string;
}

export const PageLayout = ({
  children,
  className,
  backUrl,
}: PageLayoutProps) => {
  return (
    <div className={`px-6 py-10 md:px-12 lg:px-20 ${className}`}>
      {backUrl && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to={backUrl}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};
