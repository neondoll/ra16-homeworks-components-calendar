import { addDays, eachDayOfInterval, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';

const weekDays: WeekDay[] = [
  { title: 'Понедельник', attr: 'Пн', isEnd: false },
  { title: 'Вторник', attr: 'Вт', isEnd: false },
  { title: 'Среда', attr: 'Ср', isEnd: false },
  { title: 'Четверг', attr: 'Чт', isEnd: false },
  { title: 'Пятница', attr: 'Пт', isEnd: false },
  { title: 'Суббота', attr: 'Сб', isEnd: true },
  { title: 'Воскресенье', attr: 'Вс', isEnd: true },
];

function Calendar({ date }: { date: Date }) {
  const lastDay = lastDayOfMonth(date);
  const firstDay = startOfMonth(date);

  const allDaysOfMonth = eachDayOfInterval({
    start: addDays(firstDay, 1 - Number(format(firstDay, 'i'))),
    end: addDays(lastDay, 7 - Number(format(lastDay, 'i'))),
  });

  const formatDate = (formatStr: string) => format(date, formatStr, { locale: ru });
  const isOtherMonth = (day: Date) => {
    return format(day, 'M') !== format(date, 'M');
  };
  const isToday = (day: Date) => {
    return format(day, 'd') === format(date, 'd');
  };

  const dateYear = formatDate('y');

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{formatDate('EEEE')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{formatDate('d')}</div>
          <div className="ui-datepicker-material-month">{formatDate('MMMM')}</div>
          <div className="ui-datepicker-material-year">{dateYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{formatDate('LLLL')}</span>&nbsp;
          <span className="ui-datepicker-year">{dateYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          {weekDays.map((weekDay, index) => (
            <col
              className={weekDay.isEnd ? 'ui-datepicker-week-end' : ''}
              key={`week-day-${index + 1}`}
            />
          ))}
        </colgroup>
        <thead>
        <tr>
          {weekDays.map((weekDay, index) => (
            <th
              key={`week-day-${index + 1}`}
              scope="col"
              title={weekDay.title}
            >{weekDay.attr}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {Array.from(
          { length: allDaysOfMonth.length / weekDays.length },
          (_, i) => i + 1,
        ).map((week) => (
          <tr key={`week-${week}`}>
            {allDaysOfMonth.splice(0, weekDays.length).map((day, index) => (
              <td
                className={isToday(day) ? 'ui-datepicker-today' : (isOtherMonth(day) ? 'ui-datepicker-other-month' : '')}
                key={`week-${week}-day-${index + 1}`}
              >{format(day, 'd')}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
