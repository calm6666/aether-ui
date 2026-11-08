import { createComponent, JSX, JSXElement, Show, splitProps } from "solid-js"
import { useClassList } from "../utils/useProps"
import { F7CheckmarkAltCircleFill, F7ExclamationmarkTriangleFill, F7InfoCircleFill, F7XmarkCircleFill } from "aether-icons/f7"

export interface ResultProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
    layout?: 'h' | 'v'
    icon?: JSXElement
    status?: 'success' | 'warning' | 'error' | 'info'
    title?: string | JSXElement
    subTitle?: string | JSXElement
    extra?: JSXElement
    desc?: string | JSXElement
}

const icons: any = {
    info: F7InfoCircleFill,
    success: F7CheckmarkAltCircleFill,
    warning: F7ExclamationmarkTriangleFill,
    error: F7XmarkCircleFill
}

const getIcon = (status: string) => {
    return createComponent(icons[status], {});
}

export function Result(props: ResultProps) {
    const [local, rest] = splitProps(props, ['layout', 'icon', 'status', 'title', 'subTitle', 'extra', 'desc', 'classList', 'class'])
    const status = local.status ?? 'info';
    const icon = local.icon ?? getIcon(status);
    const classList = () => useClassList(local, 'ae-result', {
        [`ae-result-${status}`]: !!status
    })

    return <div classList={classList()} {...rest}>
        <Show when={icon}>
            <div class="ae-result-icon">
                {icon}
            </div>
        </Show>
        <Show when={local.title}>
            <div class="ae-result-title">
                {local.title}
            </div>
        </Show>
        <Show when={local.subTitle}>
            <div class="ae-result-subtitle">
                {local.subTitle}
            </div>
        </Show>
        <Show when={local.extra}>
            <div class="ae-result-extra">
                {local.extra}
            </div>
        </Show>
        <Show when={local.desc}>
            <div class="ae-result-desc">
                {local.desc}
            </div>
        </Show>
    </div>
}
