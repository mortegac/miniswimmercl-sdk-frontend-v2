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

function Main(props:any) {
  const {data} = props;
  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialDate: "2025-01-01",
    navLinks: true,
    editable: false,
    dayMaxEvents: false,
    events: [
      ...data
    ],
    // events: [
    //   {
    //     "title": "3-4 undefined/1 CLUB-PATO-CORNEJO",
    //     "start": "2025-01-19",
    //     "end": "2025-01-19"
    //   },
    //   {
    //     "title": "2-4 undefined/1 VITACURA-PISCINA-MUNICIPAL",
    //     "start": "2025-01-28",
    //     "end": "2025-01-28"
    //   },
    //   {
    //     "title": "2-4 undefined/1 COLEGIO-JOHN-ANDREWS",
    //     "start": "2025-01-17",
    //     "end": "2025-01-17"
    //   },
    //   {
    //     "title": "1-4 undefined/1 MI-CLUB-PREMIUM",
    //     "start": "2025-01-26",
    //     "end": "2025-01-26"
    //   },
    //   {
    //     "title": "1-4 undefined/1 CLUB-PATO-CORNEJO",
    //     "start": "2025-01-12",
    //     "end": "2025-01-12"
    //   },
    //   {
    //     "title": "1-1 undefined/01 COLEGIO-JOHN-ANDREWS",
    //     "start": "2025-01-31",
    //     "end": "2025-01-31"
    //   },
    // ],
    // events: [
    //   {
    //     title: "8 | Bebes - 2 a 12 meses - 10:00 ",
    //     start: "2045-01-01",
    //     end: "2045-01-01",
    //   },
    //   {
    //     title: "6 | Bebes - 2 a 12 meses - 10:30 ",
    //     start: "2045-01-03",
    //     end: "2045-01-03",
    //   },
    //   {
    //     title: "5 | Bebes - 2 a 12 meses - 11:00 ",
    //     start: "2045-01-04",
    //     end: "2045-01-04",
    //   },
    //   {
    //     title: "4 | Bebes - 2 a 12 meses - 11:00 ",
    //     start: "2045-01-04",
    //     end: "2045-01-04",
    //   },
    //   {
    //     title: "MI CLUB - 8",
    //     start: "2045-01-04",
    //     end: "2045-01-04",
    //   },
    //   {
    //     title: "MI CLUB - 8",
    //     start: "2045-01-04",
    //     end: "2045-01-04",
    //   },
    //   {
    //     title: "MI CLUB - 8",
    //     start: "2045-01-04",
    //     end: "2045-01-04",
    //   },
      
      
    // ],
    
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
    <>
      <div className="full-calendar">
        {/* <FullCalendar {...options} /> */}
        <FullCalendar
        {...options}
        eventContent={(eventInfo) => (
          // <div className="p-2">
            <button  className="p-2">
              <p className="text-sm block text-wrap text-center text-slate-600">{eventInfo.event.title}</p>
              <p className="text-xs text-green-700">{eventInfo.timeText}</p>
            </button>
          // {/* </div> */}
        )}
 eventDisplay="block"
 eventBackgroundColor="rgb(241 245 249)"
 eventBorderColor="rgb(71 85 105)"
 eventTextColor="white"
 displayEventTime={true}
 displayEventEnd={true}
 eventTimeFormat={{
   hour: '2-digit',
   minute: '2-digit',
   meridiem: false
 }}
/>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Main;
