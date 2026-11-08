import type { JSXElement} from "solid-js";
import { Show } from "solid-js";
import { useClassList } from "../utils/useProps";

export interface CardProps {
    classList?: any,
    class?: any,
    children?: any,
    bordered?: boolean,
    rised?: boolean,
    title?: any,
    size?: 'small'|'default'|'large',
    cover?: JSXElement,
    style?: any,
    headStyle?: any,
    bodyStyle?: any,
    footer?: any
}

export function Card (props: CardProps) {
    const classList = () => useClassList(props, 'ae-card', {
        'ae-card-bordered': props.bordered,
        'ae-card-rised': props.rised,
        [`ae-card-${props.size}`]: props.size,
    });
    return <div classList={classList()} style={props.style}>
        {
            props.title ? <div class="ae-card-head" style={props.headStyle}>
                { props.title }
            </div>
            : null
        }
        <Show when={props.cover}>
            <div class="ae-card-cover">{props.cover}</div>
        </Show>
        <div class="ae-card-body" style={props.bodyStyle}>
            { props.children }
        </div>
        {
            props.footer ? <div class="ae-card-footer">{props.footer}</div> : null
        }
    </div>
}
