import { createEffect, createSignal, For, Show } from "solid-js";
import { InnerCheckbox } from "../inner/Checkbox";
import type { TreeContextProps} from ".";
import { useTreeContext , dragHoverPartEnum} from ".";
import type { TreeNode } from "./store";
import { Loading } from "../inner/Loading";
import { FeatherChevronRight } from "aether-icons/feather";

export function Node (props: any) {
    const ctx: TreeContextProps = useTreeContext();
    let nodeBody: any;
    const [dragoverBefore, setDragoverBefore] = createSignal(false);
    const [dragoverBody, setDragoverBody] = createSignal(false);
    const [dragoverAfter, setDragoverAfter] = createSignal(false);

    const opened = () => ctx.store.store.nodeMap[props.data[ctx.store.keyField]].expand;
    const selected = () => ctx.store.store.nodeMap[props.data[ctx.store.keyField]]._selected;
    const dragging = () => ctx.store.store.nodeMap[props.data[ctx.store.keyField]]._dragging;


    const classList = () => ({
        'ae-tree-item': true,
        'ae-tree-item-open': opened(),
        'ae-tree-item-selected': selected(),
        'ae-tree-item-dragging': dragging(),
        [`${ctx.draggingClass}`]: !!ctx.draggingClass && dragging(),
        [`${ctx.selectedClass}`]: ctx.selectedClass && selected(),
    });

    const hasChildren = () => props.data.children && props.data.children.length || props.data.loading;

    const icon = () => {
        let icon = ctx.directory ? (hasChildren() ? <span class="ae-tree-item-folder" />
        : <span class="ae-tree-item-file" />) : null;
        if (ctx.customIcon && typeof ctx.customIcon === 'function') {
            icon = <span class="ae-tree-item-icon">{ctx.customIcon(props.data)}</span>;
        }
        if (props.data.icon) {
            icon = <span class="ae-tree-item-icon">{props.data.icon}</span>;
        }
        return icon;
    }

    const onContextMenu = () => {
        if (ctx && ctx.contextMenu) {
            ctx.onContextMenu && ctx.onContextMenu({...props.data});
        }
    }

    const onOpenClose = () => {
        ctx.onOpenClose(props.data);
    }

    const onNodeSelect = () => {
        ctx.onNodeSelect(props.data);
    }

    const onDragStart = (e: any) => {
        if (props.data.disabled) {
            return;
        }
        if (ctx.draggable) {
            if (e.dataTransfer) {
                e.dataTransfer.setData('node', props.data[ctx.store.keyField]);
            }
            // 打开的父节点进行关闭
            if (opened()){
                ctx.onOpenClose(props.data);
            }
            ctx.store.setNodeDragging(props.data[ctx.store.keyField], true);
            ctx.onDragStart?.(e, props.data);
        }
    }

    const onDragEnd = (e: any) => {
        if (ctx?.store) {
            ctx.store.setNodeDragging(props.data[ctx.store.keyField], false);
        }
    }

    const getHoverPart = (e: any) => {
        const boundingClientRect = nodeBody.getBoundingClientRect()
        const height = boundingClientRect.height
        const y = e.clientY - boundingClientRect.top
        if (y <= height * 0.3) return dragHoverPartEnum.before;
        if (y <= height * (0.3 + 0.4)) return dragHoverPartEnum.body
        return dragHoverPartEnum.after;
    }

    const onDragEnter = (e: any) => {
        e.preventDefault()
        const hoverPart = getHoverPart(e)
        resetDragoverFlags(hoverPart);
        ctx.onDragEnter?.(e, props.data, hoverPart);
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
        const hoverPart = getHoverPart(e)
        resetDragoverFlags(hoverPart)
        ctx.onDragOver?.(e, props.data, hoverPart);
    }

    const onDragLeave = (e: any) => {
        const hoverPart = getHoverPart(e)
        resetDragoverFlags(hoverPart, true)
        ctx.onDragLeave?.(e, props.data, hoverPart);
    }

    const onDrop = (e: any) => {
        const hoverPart = getHoverPart(e)
        resetDragoverFlags(hoverPart, true)
        ctx.onDrop?.(e, props.data[ctx.store.keyField], hoverPart);
    }


    const resetDragoverFlags = (hoverPart: dragHoverPartEnum, isLeaveOrDrop = false) => {
        setDragoverBefore(false);
        setDragoverBody(false);
        setDragoverAfter(false);
        if (!isLeaveOrDrop) {
            if (hoverPart === dragHoverPartEnum.before) setDragoverBefore(true);
            else if (hoverPart === dragHoverPartEnum.body) setDragoverBody(true)
            else if (hoverPart === dragHoverPartEnum.after) {
                isLast() && setDragoverAfter(true)
            }
        }
    }

    createEffect(() => {
        // console.log(props.data.id, ctx.store.store.nodeMap[props.data.id]._expandShow);
    })

    const isLast = () => {
        const parent = props.data._parent;
        if (parent) {
            const index = parent.children.findIndex((item: TreeNode) => item[ctx.store.keyField] === props.data[ctx.store.keyField]);
            if (index === parent.children.length - 1) return true;
        }
        return false;
    }

    const paddingStyle = () => ({'padding-left': 16 * props.data._level + 'px', height: '100%'})
    const beforeClassList = () => ({'ae-tree-node-drop': true, 'ae-tree-node-drop_active': dragoverBefore()})
    const afterClassList = () => ({'ae-tree-node-drop': true, 'ae-tree-node-drop_active': dragoverAfter()})
    const bodyClassList = () => ({'ae-tree-node-content': true, 'ae-tree-node-drop_active': dragoverBody(), [`${ctx.dragHoverClass}`]: !!ctx.dragHoverClass && dragoverBody()})

    const loading = () => ctx.store.store.nodeMap[props.data[ctx.store.keyField]].__loading;
    return <div classList={classList()} style={paddingStyle()} onDragEnter={onDragEnter}
            onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
            ref={(el) => { nodeBody = el; props.ref(el); }}>
                <div classList={beforeClassList()} />
                <div classList={bodyClassList()} onDragStart={onDragStart} onDragEnd={onDragEnd} draggable={ctx.draggable && !props.data.disabled}>
                    <Show when={loading()} fallback={<span class={"ae-tree-arrow " + (hasChildren() ? "" : "hide")} onClick={onOpenClose}>
                        {/* <img src={arrow}/> */}
                        <Show when={ctx.arrowIcon && typeof ctx.arrowIcon} fallback={
                            <FeatherChevronRight />
                        }>
                            {ctx.arrowIcon?.()}
                        </Show>
                    </span>}>
                        <Loading color={'#1890ff'} size={16}/>
                    </Show>
                    <Show when={ctx.checkable}>
                        <InnerCheckbox disabled={ctx.store.store.nodeMap[props.data[ctx.store.keyField]].disabled}
                            checked={ctx.store.store.nodeMap[props.data[ctx.store.keyField]].checked} onChange={(checked) => ctx.onNodeCheck(props.data, checked)}/>
                    </Show>
                    {icon()}
                    <span onContextMenu={onContextMenu} class={`ae-tree-title`} onClick={onNodeSelect}>
                        <span class="ae-tree-text">{props.data.title}</span>
                        {props.data.patch ? <span class="ae-tree-patch">{props.data.patch}</span> : null}
                    </span>
                </div>
                <div classList={afterClassList()} />
        </div>
}
