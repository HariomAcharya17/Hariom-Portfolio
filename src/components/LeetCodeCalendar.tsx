import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeetCodeCalendar() {

  const [activeDates, setActiveDates] = useState<string[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthName = today.toLocaleString("default", { month: "long" });

  useEffect(() => {

    const fetchDates = async () => {

      const { data } = await supabase
        .from("leetcode_activity")
        .select("date");

      if (data) {
        setActiveDates(data.map((d:any)=>d.date));
      }

    };

    fetchDates();

  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays:any[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {

    const date = new Date(year, month, i)
      .toISOString()
      .split("T")[0];

    calendarDays.push(date);
  }

  return (

    <div className="mt-6 w-[300px]">

      {/* Title */}
      <h3 className="text-purple-300 text-sm font-mono mb-3">
        LeetCode Progress — {monthName} {year}
      </h3>

      {/* Days */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1">

        {calendarDays.map((day, i) => {

          if (!day) {
            return <div key={i}></div>;
          }

          const active = activeDates.includes(day);

          return (

            <div
              key={i}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-xs
              ${
                active
                ? "bg-green-500 text-black"
                : "bg-purple-900/40 text-gray-300"
              }`}
            >
              {new Date(day).getDate()}
            </div>

          );

        })}

      </div>

    </div>

  );

}