import { Component, OnInit } from '@angular/core';
declare var FullCalendar: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngAfterViewInit(): void {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [
        { title: 'Event 1', start: '2025-04-10',
          end: '2025-04-13', id: '1',  backgroundColor: '#2ecc71' },
        { title: 'Event 2', date: '2025-04-09', id:'2',  backgroundColor: 'blue' }
      ],
      eventClick: function(info: any) {
        alert(`Event clicked: ${info.event.title}`);
        // Or use console.log to inspect event info
        console.log('Event details:', info.event);
      }
    });

    calendar.render();
  }

  ngOnInit(): void {
  }

}
