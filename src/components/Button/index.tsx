import useClickAnimating from "../utils/useClickAnimating";
import { Loading } from "../inner/Loading";
import type { JSX } from "solid-js";
import { createComputed, Show, splitProps, useContext } from "solid-js";
import { ButtonGroupContext } from "../ButtonGroup";
import { useClassList } from "../utils/useProps";

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    classList?: any,
    class?: string,
    type?: 'primary'|'secondary'|'tertiary'|'success'|'error'|'danger'|'warning'|'default',
    theme?: 'light'|'solid'|'borderless'|'outline'|'dashed'
    block?: boolean,
    size?: 'small'|'default'|'large',
    active?: boolean,
    shape?: 'square'|'round'|'circle'
    disabled?: boolean,
    loading?: boolean,
    icon?: any,
    iconAlign?: 'left' | 'right',
    ref?: any,
    onClick?: (e: any) => void
}

export const Button = (props: ButtonProps) => {
        const [animating, setAnimating] = useClickAnimating();
        const iconPosition = props.iconAlign || 'left';
        const ctx: any = useContext(ButtonGroupContext);
        const type = () => props.type || ctx?.type || 'default';
        const size = () => props.size || ctx?.size;
        const theme = () => props.theme || ctx?.theme || 'solid';
        const shape = () => props.shape || ctx?.shape || 'square';
        const disabled = () => props.disabled || ctx?.disabled;

        const classList = () => useClassList(props, {
            'ae-button': true,
            [`ae-button-icon-${iconPosition}`]: true,
            'ae-click-animating': animating(),
            'ae-button-block': props.block,
            [`ae-button-${type()}`]: type(),
            [`ae-button-theme-${theme()}`]: theme(),
            [`ae-button-${size()}`]: size(),
            'ae-button-active': props.active,
            'ae-button-circle': shape() === 'circle',
            'ae-button-round': shape() === 'round',
            'ae-button-icon-only': !!props.icon && !props.children,
            'ae-button-empty': !props.icon && !props.children
        });

        const [local, others] = splitProps(props, ['classList', 'class', 'onClick', 'style', 'title', 'type', 'block',
            'size', 'active', 'shape', 'icon', 'children', 'iconAlign', 'disabled', 'loading', 'ref']);

        function handleClick (e: any) {
            if (disabled() || local.loading) {
                return;
            }
            if (local.onClick) {
                local.onClick(e);
            }
        }

        const slots = iconPosition === 'left' ?
        <>
            { local.loading ? <Loading /> : local.icon ? <span class="ae-button-icon">{local.icon}</span> : null }
            {local.children}
        </> :
        <>
            {local.children}
            {local.loading ? <Loading /> : local.icon ? <span class="ae-button-icon">{local.icon}</span> : null}
        </>
    return <button type="button" classList={classList()} style={local.style} ref={local.ref} title={local.title} disabled={disabled()} {...others} onMouseUp={setAnimating} onClick={handleClick}>{slots}</button>
}
