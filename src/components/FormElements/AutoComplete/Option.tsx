import { Show } from "solid-js";

export interface AutoCompleteOptionprops {
    data: any,
    checked?: boolean,
    disabled?: boolean,
    textField: string,
    valueField: string,
    onClick?: (value: any, data: any) => void,
    style?: any,
    visible?: boolean,
    renderOption?: (data: any) => any
}

export function Option (props: AutoCompleteOptionprops) {
    const classList = () => ({
        'ae-select-option': true,
        'ae-select-group-wrap': props.data.children && props.data.children.length,
        'ae-select-option-active': props.checked,
        'ae-select-option-disabled': props.data.disabled,
    });
    const value = props.data[props.valueField];
    return <Show when={props.visible} fallback={null}>
        <li classList={classList()} style={props.style} onClick={() => props.onClick && props.onClick(value, props.data)}>
            {props.renderOption ? props.renderOption(props.data) : props.data[props.textField]}
        </li>
    </Show>;
}
