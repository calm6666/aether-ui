import type { JSXElement} from "solid-js";
import { Show } from "solid-js"
import { useClassList } from "../utils/useProps"
import { useSlots } from "../utils/useSlots"
import createModel from "../utils/createModel"
import { FeatherX } from 'aether-icons/feather';
import { F7ExclamationmarkTriangleFill, F7CheckmarkAltCircleFill, F7XmarkCircleFill, F7InfoCircleFill } from "aether-icons/f7";

export interface BannerProps {
    type: 'warning'|'info'|'success'|'error'
    classList?: any
    class?: string
    bordered?: boolean
    icon?: JSXElement
    closeIcon?: JSXElement | null
    children?: any
    onClose?(): void
    title?: JSXElement | string
    fullMode?: boolean
    visible?: any
}

export function Banner (props: BannerProps) {
    const [visible, setVisible] = createModel(props, 'visible', true);
    const classList = () => useClassList(props, 'ae-banner', {
        [`ae-banner-${props.type}`]: props.type,
        [`ae-banner-bordered`]: props.bordered,
        [`ae-banner-full`]: props.fullMode ?? true,
        [`ae-banner-not-full`]: props.fullMode === false,
    })
    const getIconByType = () => {
        let icon = null;
        switch (props.type) {
            case 'info': {
                icon = <F7InfoCircleFill />;
                break;
            }
            case 'success': {
                icon = <F7CheckmarkAltCircleFill/>;
                break;
            }
            case 'warning': {
                icon = <F7ExclamationmarkTriangleFill />;
                break;
            }
            case 'error': {
                icon = <F7XmarkCircleFill/>;
                break;
            }
            default: {
                icon = <F7InfoCircleFill/>;
            }
        }
        return icon;
    }

    const onClickClose = () => {
        setVisible(false);
        props.onClose && props.onClose();
    }

    const slots = useSlots(props.children);

    const icon = props.icon === null ? null : props.icon ?? getIconByType();
    return <Show when={visible()}>
        <div classList={classList()}>
            <div class="ae-banner-body">
                <div class="ae-banner-content">
                    <Show when={icon}>
                        <div class="ae-banner-icon">{icon}</div>
                    </Show>
                    <div class="ae-banner-content-body">
                        <Show when={props.title}>
                            <div class="ae-banner-title">
                                {props.title}
                            </div>
                        </Show>
                        <Show when={slots.default}>
                            <div class="ae-banner-desc">
                                {slots.default}
                            </div>
                        </Show>
                    </div>
                </div>
                <Show when={props.closeIcon !== null}>
                    <span class="ae-banner-close" onClick={onClickClose}>{props.closeIcon ?? <FeatherX />}</span>
                </Show>
            </div>
            <Show when={slots.extra}>
                <div class="ae-banner-extra">
                    {slots.extra}
                </div>
            </Show>
        </div>
    </Show>
}
