import type { JSXElement} from "solid-js";
import { splitProps } from "solid-js"
import { useClassList, useStyle } from "../utils/useProps"
import { useDropdownConext } from ".";
import { FeatherChevronRight } from "aether-icons/feather";
import { isColor } from "../utils/utils";

export interface DropdownItemProps {
    class?: string
    classList?: any
    style?: any
    children?: any
    disabled?: boolean
    name?: string
    divided?: boolean
    icon?: JSXElement
    arrow?: boolean
    data?: any
    theme?: string|'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'|'info'|'light'
    selected?: boolean
}

export function DropdownItem (props: DropdownItemProps) {
    const [local, others] = splitProps(props, ['classList', 'class', 'theme', 'disabled', 'data', 'name', 'divided', 'children', 'arrow', 'icon', 'style', 'selected'])
    const theme = isColor(props.theme) ? '' : props.theme;
    const classList = () => useClassList(local, 'ae-dropdown-item', {
        'ae-dropdown-item-disabled': local.disabled,
        'ae-dropdown-item-divided': local.divided,
        'ae-dropdown-item-selected': local.selected,
        'ae-dropdown-item-with-arrow': local.arrow,
        [`ae-dropdown-item-${theme}`]: theme,
    });
    const ctx: any = useDropdownConext();
    const onClick= (e: any) => {
        if (local.disabled) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        ctx?.onSelect(local.name, local.data);
    }

    const style = () =>useStyle(local, {
        '--ae-dropdown-text-color': isColor(props.theme) ? props.theme : '',
    })

    return <li classList={classList()} {...others} style={style()} onClick={onClick}>
        {local.icon ? <span class="ae-dropdown-item-icon">{local.icon}</span> : null}
        {local.children}
        {local.arrow ? <FeatherChevronRight class="ae-dropdown-item-arrow" /> : null}
    </li>
}
