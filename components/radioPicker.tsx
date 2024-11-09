export default function RadioPicker(props: { set: (name: string) => void, radioGroup: string, name: string, icon:string, selected: string}) {
    return <label className={props.selected == props.name ? "bg-gray-300" : "bg-transparent"}>
        <img src={props.icon} className="h-32 m-auto"/>
        <br/>
        <input type="radio" id={props.name} name={props.radioGroup} onClick={() => props.set(props.name)}/>
        <p>{props.name}</p>
    </label>
}