import './button.css'
export function Button(props){
    return(
        <>
        <div className="button-box">
            <button className="button" onClick={props.onClick}>{props.text}</button>
        </div>
        </>
    )
}