import { Icon } from "../../Icon"

export function Value (props: any) {
    return <div class="ae-select-value" tabIndex="0" onClick={props.onShowHide}>
        <input type="hidden" name={props.name} value={props.value}/>
        {
            props.prefix
                ? <span class="ae-select-prefix">{props.prefix}</span>
                : null
        }
        <div class="ae-select-text"><div>{props.labels}</div></div>
        <Icon name="chevron-down" class="ae-select-cert"/>
        {
            props.clearable
                ? <Icon name="x-circle" class="ae-select-clear" onClick={props.onClear}/>
                : null
        }
    </div>
}
