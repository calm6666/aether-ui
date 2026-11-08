import { Show } from "solid-js";

type SelectInnerOptions = {
    data: any,
    checked?: boolean,
    disabled?: boolean,
    textField: string,
    valueField: string,
    onClick?: (value: any) => void,
    style?: any,
    visible?: boolean,
    ref?: any,
    renderOption?: (item: any) => any
}

export function Option (props: SelectInnerOptions) {
    const classList = () => ({
        'ae-select-option': true,
        'ae-select-group-wrap': props.data.group,
        'ae-select-option-active': props.checked,
        'ae-select-option-disabled': props.data.disabled,
    });
    const onClick = () => {
        if (props.disabled) {
            return;
        }
        props.onClick && props.onClick(value);
    }
    const value = props.data[props.valueField];
    return <Show when={props.visible} fallback={null}>
        <li ref={props.ref} classList={classList()} style={props.style} onClick={onClick}>
            {props.renderOption ? props.renderOption(props.data) : props.data[props.textField]}
        </li>
    </Show>;
}
