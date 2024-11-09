export default function RadioPicker(props: { set: (name: string) => void, radioGroup: string, selected: string, candidate: {
    name: string,
    icon: string,
    color: string
}}) {
    return <label className={props.selected == props.candidate.name ? "bg-gray-300" : "bg-transparent"}>
        <img src={props.candidate.icon} className="h-32 m-auto"/>
        <br/>
        <input type="radio" id={props.candidate.name} name={props.radioGroup} onClick={() => props.set(props.candidate.name)}/>
        <p>{props.candidate.name}</p>
    </label>
}