import { createSignal, For, onMount } from "solid-js";
import { useClassList } from "../utils/useProps";
import { Loading } from "../inner/Loading";
import usezIndex from "../utils/usezIndex";
import { F7ExclamationmarkTriangleFill, F7CheckmarkAltCircleFill, F7XmarkCircleFill, F7InfoCircleFill } from "aether-icons/f7";
import { FeatherX } from "aether-icons/feather";

function getIcon (type: string) {
    let icon = null;
    switch (type) {
        case 'info': {
            icon = <F7InfoCircleFill class="ae-message-icon" size={19}/>;
            break;
        }
        case 'success': {
            icon = <F7CheckmarkAltCircleFill class="ae-message-icon" size={19}/>;
            break;
        }
        case 'warning': {
            icon = <F7ExclamationmarkTriangleFill class="ae-message-icon" size={19}/>;
            break;
        }
        case 'error': {
            icon = <F7XmarkCircleFill class="ae-message-icon" size={19}/>;
            break;
        }
    }
    return icon;
}

function Message (props: any) {
    const [visible, setVisible] = createSignal(false);
    const data = props.data;
    let wrap: any;
    const classList = () => useClassList(data, 'ae-message', {
        'ae-message-visible': visible(),
        [`ae-message-${data.type}`]: data.type,
        'ae-message-background': data.background
    });

    onMount(() => {
        // 设置效果
        setTimeout(() => {
            setVisible(true);
        });
        let duration = data.duration;
        if (duration === undefined || duration === null) {
            duration = 4;
        }

        if (duration) {
            setTimeout(() => {
                hide();
            }, duration * 1000);
        }
    });

    const hide = () => {
        // 隐藏效果
        setVisible(false);
    }

    const close = () => {
        if (!visible()) {
            props.onClose(data);
            data.onClose && data.onClose();
        }
    }

    const style = () => ({...data.style, 'z-index': usezIndex()})
    return <div classList={classList()} style={style()} ref={wrap} onTransitionEnd={close}>
        <div class="ae-message-inner">
            {
                data.loading ? <Loading /> : getIcon(data.type)
            }
            <div class="ae-message-content">
                {data.content}
            </div>
            {
                data.closeable ? <div class="ae-message-close">
                    <FeatherX class="ae-message-close-icon" size={14} onClick={hide}/>
                </div> : null
            }
        </div>
    </div>
}

export function Messages (props: any) {
    return <For each={props.data}>
            {(item: any) => {
                return <Message data={item} onClose={props.onClose}/>
            }}
        </For>
}
