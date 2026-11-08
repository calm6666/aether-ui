import type { JSXElement} from "solid-js";
import { Show } from "solid-js";
import { useClassList } from "../utils/useProps";

export interface TimelineItemProps {
    children?: any,
    classList?: any,
    class?: string,
    color?: 'blue'|'green'|'red'|'yellow',
    fill?: boolean,
    icon?: JSXElement,
    time?: string
};
export function TimelineItem (props: TimelineItemProps) {
    const color = props.color ?? 'blue';
    const classList = () => useClassList(props, 'ae-timeline-item-head', {
        [`ae-timeline-item-head-${color}`]: color,
        'ae-timeline-item-head-custom': props.icon,
        'ae-timeline-item-head-fill': props.fill
    })
    return <div class="ae-timeline-item">
        <div class="ae-timeline-item-tail" />
        <div classList={classList()}>
            {props.icon}
        </div>
        <div class="ae-timeline-item-content">
            {props.children}
            <Show when={props.time}>
                <div class="ae-timeline-time">
                    {props.time}
                </div>
            </Show>
        </div>
    </div>
}
