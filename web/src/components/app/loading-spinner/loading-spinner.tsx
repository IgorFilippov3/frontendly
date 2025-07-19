import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "white";
  className?: string;
  text?: string;
  centered?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const variantClasses = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  white: "text-white",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export const LoadingSpinner = ({
  size = "md",
  variant = "primary",
  className,
  text,
  centered = false,
}: LoadingSpinnerProps) => {
  const spinnerContent = (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
      />
      {text && (
        <p
          className={cn(
            "font-medium",
            textSizeClasses[size],
            variantClasses[variant],
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};
