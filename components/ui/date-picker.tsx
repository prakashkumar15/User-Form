import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  value?: string | null; // ISO date string (YYYY-MM-DD) or null
  onChange?: (value: string | null) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const initial = value ? new Date(value) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initial);

  React.useEffect(() => {
    // keep internal state in sync when value prop changes
    const next = value ? new Date(value) : undefined;
    if (
      (next && !date) ||
      (!next && date) ||
      (next && date && next.getTime() !== date.getTime())
    ) {
      setDate(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleSelect(d: Date | undefined) {
    setDate(d);
    if (!d) return onChange?.(null);
    // use YYYY-MM-DD for form values
    const iso = d.toISOString().slice(0, 10);
    onChange?.(iso);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
