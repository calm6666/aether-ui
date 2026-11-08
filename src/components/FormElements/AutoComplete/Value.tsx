import { Icon } from "../../Icon"

export function Value (props: any) {
    return <div class="ae-select-value" tabIndex="0" onClick={props.onShowHide}>
        <input class="ae-select-input" value={props.labels} onInput={props.onFilter}/>
        {
            props.prefix
                ? <span class="ae-select-prefix">{props.prefix}</span>
                : null
        }
        <Icon name="chevron-down" class="ae-select-cert"/>
        {
            props.clearable
                ? <Icon name="x-circle" class="ae-select-clear" onClick={props.onClear}/>
                : null
        }
    </div>
}
