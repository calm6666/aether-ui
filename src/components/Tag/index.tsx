import type { Signal } from 'solid-js';
import { onMount, Show } from 'solid-js';
import { useClassList } from '../utils/useProps';
import createModel from '../utils/createModel';
import { FeatherX } from 'aether-icons/feather';

export interface TagProps {
    classList?: any,
    class?: string,
    theme?: 'primary'|'danger'|'warning'|'success'|'info'|'magenta'|'red'|'volcano'|'orange'|'gold'|'yellow'|'lime'|'green'|'cyan'|'blue'|'geekblue'|'purple',
    value?: any,
    circle?: boolean,
    size?: 'small'|'large'|'xlarge',
    avatar?: any,
    onBeforeClose?: (e: any) => boolean,
    onClose?: (e: any) => void,
    style?: any,
    children?: any,
    closable?: boolean,
    border?: boolean,
    ref?: any
    visible?: boolean | Signal<boolean>
}

export function Tag (props: TagProps) {
    const value = () => props.value || '';
    const classList = () => useClassList(props, 'ae-tag', {
        [`ae-tag-${props.theme}`]: props.theme,
        'ae-tag-has-badge': value() !== '',
        'ae-tag-border': props.border,
        'ae-tag-circle': !value() && props.circle,
        [`ae-tag-${props.size}`]: props.size,
        'ae-tag-has-avatar': props.avatar
    });
    let el: any;

    const [visible, setVisible] = createModel(props, 'visible', true);

    const _onClose = (e: any) => {
        if (props.onBeforeClose) {
            const ret = props.onBeforeClose(e);
            if (ret) {
                doClose(e);
            }
        } else {
            doClose(e);
        }
    }

    const doClose = (e: any) => {
        setVisible(false);
        if (props.onClose) {
            props.onClose(e);
        }
    }

    onMount(() => {
        props.ref?.({
            el
        });
    })

    return <Show when={visible()} fallback={null}>
        <div classList={classList()} ref={el} style={props.style}>
            {props.avatar}
            <div class="ae-tag-content">
                <div class="ae-tag-text">{props.children}</div>
                {
                    props.closable
                        ? <FeatherX class="ae-tag-close" size={12} onClick={_onClose}/>
                        : null
                }
            </div>
            {
                value() !== '' ? <span class="ae-tag-badge">
                    <span class="ae-tag-badge-text">{value()}</span>
                </span> : null
            }
        </div>
    </Show>
}
