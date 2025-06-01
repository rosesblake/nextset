"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-6 w-full max-w-none mx-auto border border-white/20 bg-white shadow-md rounded-2xl",
        className
      )}
      classNames={{
        months: "flex flex-col gap-6 w-full items-center",
        month: "w-full",
        caption: "flex justify-center pt-2 relative items-center w-full",
        caption_label: "text-lg font-semibold",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "w-9 h-9 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse table-fixed",
        head_row: "",
        head_cell:
          "text-muted-foreground rounded-md font-medium text-[0.9rem] h-14",
        row: "",
        cell: "",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-[64px] p-0 font-normal flex items-center justify-center aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground font-semibold",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled:
          "bg-neutral-100 text-muted-foreground line-through opacity-60 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("w-5 h-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("w-5 h-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
