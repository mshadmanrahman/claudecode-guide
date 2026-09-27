import { Win } from './kit';

export function CalendarEventIllustration() {
  return (
    <Win title="friday" width={260}>
      <ul className="il-slots">
        <li>
          <span className="il-time">8:30</span> Standup
        </li>
        <li className="is-acc">
          <span className="il-time">9:00</span> 1:1 with Sarah
        </li>
        <li>
          <span className="il-time">10:00</span> Product sync
        </li>
      </ul>
    </Win>
  );
}
