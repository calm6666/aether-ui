import { splitProps } from "solid-js";
import { useClassList, useStyle } from "../utils/useProps";
import type { ParagraphProps } from "./paragraph.d";


export function Text (props: ParagraphProps) {
    const [local, others] = splitProps(props, ['classList', 'class', 'children', 'type', 'disabled', 'link', 'icon',
    'mark', 'code', 'underline', 'deleted', 'strong', 'size', 'onCopy', 'gradient']);
    const size = () => local.size || 'normal';
    const classList = () => useClassList(props, 'ae-text', {
        [`ae-text-${local.type}`]: local.type,
        'ae-text-disabled': local.disabled,
        'ae-text-underline': local.underline,
        'ae-text-link': local.link,
        'ae-text-deleted': local.deleted,
        'ae-text-strong': local.strong,
        [`ae-text-${size()}`]: size(),
    });
    const style = () => useStyle(props, {
        'background-image': local.gradient ? `linear-gradient(${local.gradient.join(',')})` : '',
        '-webkit-text-fill-color': props.gradient ? 'transparent' : ''
    })
    return <span classList={classList()} {...others} style={style()}>{local.mark ? <mark>{local.children}</mark> : local.code ? <code>{local.children}</code> : local.link ? <a href={local.link}>{local.icon}<span>{local.children}</span></a> : local.children}</span>
}
