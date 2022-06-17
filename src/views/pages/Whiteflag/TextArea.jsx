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
        value={value}
        rows={7}
        className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        id={id}
        placeholder={placeholder}
        onChange={(v) => {
          onChange(v.target.value);
        }}
      ></textarea>
    </div>
  );
}
