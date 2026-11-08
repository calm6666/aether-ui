import { splitProps, type JSX } from "solid-js";
import { useClassList, useStyle } from "../utils/useProps";
import { isColor } from "../utils/utils";

export interface BadgeRibbonProps extends JSX.HTMLAttributes<HTMLDivElement> {
    text?: JSX.Element
    status?: 'success'|'error'|'warning'|'primary'|'info',
    align?: 'start'|'end'
    color?: string | 'blue'|'green'|'red'|'yellow'|'pink'|'magenta'|'volcano'|'orange'|'gold'|'lime'|'cyan'|'geekblue'|'purple'
}

export function BadgeRibbon (props: BadgeRibbonProps) {
    const [local, rest] = splitProps(props, ['children', 'text', 'class', 'classList', 'status', 'color', 'style', 'align']);
    const align = local.align ?? 'end';
    const classList = () => useClassList(props, 'ae-badge-ribbon', {
        [`ae-badge-ribbon-status-${local.status}`]: !!local.status,
        [`ae-badge-ribbon-${align}`]: !!align,
        [`ae-badge-ribbon-${local.color}`]: !!local.color && !isColor(local.color)
    });
    const style = () => useStyle(local, {
        '--ae-background-color': isColor(local.color) ? local.color : ''
    });
    return <div classList={classList()} style={style()} {...rest}>
        {props.children}
        <div class="ae-badge-ribbon-inner">
            <span class="ae-badge-ribbon-text">{local.text}</span>
            <div class="ae-badge-ribbon-corner" />
        </div>
    </div>
}
