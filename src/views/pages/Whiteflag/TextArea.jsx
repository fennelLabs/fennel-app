export function TextArea({
  id,
  title,
  value = '',
  placeholder = '',
  onChange = (v) => {}
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="form-label inline-block mb-2 text-gray-700"
      >
        {title}
      </label>
      <textarea
        id={id}
        value={value}
        rows={7}
        placeholder={placeholder}
        onChange={(v) => {
          onChange(v.target.value);
        }}
      ></textarea>
    </div>
  );
}
