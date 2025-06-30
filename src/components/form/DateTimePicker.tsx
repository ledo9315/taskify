"use client";

import { ChevronDownIcon } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "@/src/components/ui/checkbox";

interface DateTimePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [time, setTime] = useState<string | undefined>(
    value
      ? new Date(value).toTimeString().split(" ")[0].substring(0, 5)
      : undefined
  );
  const [showDateTimePicker, setShowDateTimePicker] = useState(!!value);
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (showDateTimePicker) {
      if (date) {
        const [hours, minutes] = (time ?? "00:00").split(":").map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0);
        onChange(newDate);
      }
    } else {
      onChange(null);
    }
  }, [date, time, showDateTimePicker, onChange]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && !time) {
      setTime("00:00");
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-datetime"
          checked={showDateTimePicker}
          onCheckedChange={(checked) => {
            setShowDateTimePicker(checked as boolean);
            if (!(checked as boolean)) {
              onChange(null);
            } else if (!date) {
              const newDate = new Date();
              setDate(newDate);
              setTime(newDate.toTimeString().split(" ")[0].substring(0, 5));
            }
          }}
        />
        <label
          htmlFor="show-datetime"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <FormattedMessage
            id="DateTimePicker.addDueDate"
            defaultMessage="Fälligkeitsdatum hinzufügen?"
          />
        </label>
      </div>
      {showDateTimePicker && (
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="justify-between font-normal"
                >
                  {date
                    ? date.toLocaleDateString()
                    : formatMessage({
                        id: "DateTimePicker.selectDate",
                        defaultMessage: "Datum auswählen",
                      })}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={handleDateSelect}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-3">
            <Input
              type="time"
              id="time-picker"
              step="60"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
