import "./input.css";
export function Input(props) {
  return (
    <>
      <div className="input-box">
        <input
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="input"
          type={props.type}
        />
      </div>
    </>
  );
}
