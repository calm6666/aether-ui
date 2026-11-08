export interface SelectEmptyOptionProps {
    data: any,
    checked?: boolean,
    disabled?: boolean,
    onClick?: (value: any) => void,
    style?: any,
    visible?: boolean,
}

export function EmptyOption (props: SelectEmptyOptionProps) {
    const classList = () => ({
        'ae-select-option': true,
        'ae-select-option-active': props.checked,
    });
    const value = props.data.value;
    return <li classList={classList()} style={props.style} onClick={() => props.onClick && props.onClick(value)}>
        {props.data.label}
    </li>;
}
