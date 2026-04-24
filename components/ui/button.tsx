import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-black text-white shadow-[0_18px_45px_rgba(10,10,10,.18)] hover:-translate-y-0.5 hover:bg-zinc-800",
        dark: "bg-black text-white ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-zinc-800",
        ghost: "bg-white/70 text-black ring-1 ring-black/10 hover:bg-white",
        blue: "bg-ion text-white shadow-[0_18px_45px_rgba(59,130,246,.22)] hover:-translate-y-0.5 hover:bg-blue-500"
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
