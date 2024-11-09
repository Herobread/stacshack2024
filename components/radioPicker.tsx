export default function RadioPicker(props: { set: (name: string) => void, radioGroup: string, name: string}) {
    return <label>
        <input type="radio" id={props.name} name={props.radioGroup} onClick={() => props.set(props.name)}/>
        {props.name}
    </label>
}