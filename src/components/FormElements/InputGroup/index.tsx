import { useClassList } from "../../utils/useProps"
import { children, createEffect, onMount } from "solid-js";

export function InputGroup (props: any) {
    const classList = () => useClassList(props, 'ae-input-group');
    let wrap: any;
    onMount(() => {
        resetClass();
    })

    const resetClass = () => {
        if (wrap) {
            const children = wrap.children;
            const length = children.length;
            for (let i = 0; i < length; i++) {
                const child = children[i];
                child.classList.remove('ae-input-compact-first-item');
                child.classList.remove('ae-input-compact-last-item');
                child.classList.remove('ae-input-compact-item');
                child.classList.add('ae-input-compact-item');
                if (i === 0) {
                    child.classList.add('ae-input-compact-first-item');
                }
                if (i === length - 1) {
                    child.classList.add('ae-input-compact-last-item');
                }
            }
        }
    }

    createEffect(() => {
        renderChildren();
        resetClass();
    })

    const renderChildren = () => {
        return children(() => props.children).toArray();
    }

    return <div classList={classList()} ref={wrap}>
        {props.children}
    </div>
}
