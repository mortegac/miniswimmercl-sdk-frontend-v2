import "@/assets/css/vendors/full-calendar.css";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarOptions } from "@fullcalendar/core";
import events from "@/fakers/events";

function Box() {
  return <div className="bg-pink-100">hola</div>
}

function Main() {
  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialDate: "2045-01-01",
    navLinks: true,
    editable: false,
    dayMaxEvents: false,
    events: [
      {
        title: "8 | Bebes - 2 a 12 meses - 10:00 ",
        start: "2045-01-01",
        end: "2045-01-01",
      },
      {
        title: "6 | Bebes - 2 a 12 meses - 10:30 ",
        start: "2045-01-03",
        end: "2045-01-03",
      },
      {
        title: "5 | Bebes - 2 a 12 meses - 11:00 ",
        start: "2045-01-04",
        end: "2045-01-04",
      },
      {
        title: "4 | Bebes - 2 a 12 meses - 11:00 ",
        start: "2045-01-04",
        end: "2045-01-04",
      },
      {
        title: "MI CLUB - 8",
        start: "2045-01-04",
        end: "2045-01-04",
      },
      {
        title: "MI CLUB - 8",
        start: "2045-01-04",
        end: "2045-01-04",
      },
      {
        title: "MI CLUB - 8",
        start: "2045-01-04",
        end: "2045-01-04",
      },
      
      
    ],
    // drop: function (info) {
    //   if (
    //     document.querySelectorAll("#checkbox-events").length &&
    //     (document.querySelectorAll("#checkbox-events")[0] as HTMLInputElement)
    //       ?.checked
    //   ) {
    //     (info.draggedEl.parentNode as HTMLElement).remove();
    //     if (
    //       document.querySelectorAll("#calendar-events")[0].children.length == 1
    //     ) {
    //       document
    //         .querySelectorAll("#calendar-no-events")[0]
    //         .classList.remove("hidden");
    //     }
    //   }
    // },
  };

  return (
    <div className="full-calendar">
      <FullCalendar {...options} />
    </div>
  );
}

export default Main;
