interface InputTime24HourProps {
  id: string;
  value: string; // "HH:mm" atau ""
  onChange: (value: string) => void;
  hasError?: boolean;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

export default function InputTime24Hour({ id, value, onChange, hasError }: InputTime24HourProps) {
  const [hh = '', mm = ''] = value ? value.split(':') : [];

  const update = (nextH: string, nextM: string) => {
    if (!nextH && !nextM) return onChange('');
    onChange(`${nextH || '00'}:${nextM || '00'}`);
  };

  const selectClass = `w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-text-main transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    hasError ? 'border-red-400' : 'border-canvas-border'
  }`;

  return (
    <div className="flex items-center gap-1.5">
      <select
        id={id}
        value={hh}
        onChange={(e) => update(e.target.value, mm)}
        aria-label="Jam"
        className={selectClass}
      >
        <option value="">--</option>
        {HOURS.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>
      <span className="text-text-muted">:</span>
      <select
        value={mm}
        onChange={(e) => update(hh, e.target.value)}
        aria-label="Menit"
        className={selectClass}
      >
        <option value="">--</option>
        {MINUTES.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}