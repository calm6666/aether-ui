import type { JSXElement} from "solid-js";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { useClassList } from "../utils/useProps";
import { MenuItem } from "./MenuItem";
import { useMenuContext } from ".";
import { Dropdown } from "../Dropdown";

export interface SubMenuProps {
    name?: string,
    align?: "bottom" | "right" | "bottomLeft" | "bottomRight" | "rightTop" | "left" | "leftTop",
    icon?: JSXElement,
    children?: any,
    title?: any
}

export function SubMenu (props: SubMenuProps) {
    if (!props.name) {
        console.warn("SubMenu need name prop");
    }
    const [min, setMin] = createSignal(false);
    const ctx: any = useMenuContext();
    const open = () => {
        let isOpen = false;
        if (ctx && ctx.store.openKeys && props.name) {
            isOpen = ctx.store.openKeys[props.name];
        }
        // classList 会随 activeName 等无关状态重跑，展开状态未变时不重播展开/收起动画
        if (openRan && listEle === lastEle && isOpen === lastOpen) return isOpen;
        openRan = true;
        lastEle = listEle;
        lastOpen = isOpen;
        listEle.style.transition = 'none';
        listEle.style.height = 'auto';
        const oh = listEle.offsetHeight;
        listEle.style.transition = '';
        if (isOpen) {
            listEle.style.height = '0px';
            setTimeout(() => {
                listEle.style.height = oh + 'px';
            });
            setTimeout(() => {
                listEle.style.height = 'auto';
            }, 250);
        } else {
            listEle.style.height = oh + 'px';
            setTimeout(() => {
                listEle.style.height = '0px';
            });
        }
        return isOpen;
    }
    const classList = () => useClassList(props, 'ae-menu-submenu', {
        'ae-menu-submenu-open': open(),
        'ae-menu-submenu-selected': childActive(),
    });
    // linkParent：子项激活时父菜单标题联动高亮
    const childActive = () => {
        if (!ctx?.store.linkParent || !props.name) return false;
        const active = ctx.store.activeName;
        const item = ctx.treeMap && ctx.treeMap[props.name];
        if (!active || !item) return false;
        let cur = ctx.treeMap[active];
        while (cur) {
            if (cur === item) return true;
            cur = cur.parent;
        }
        return false;
    }
    let self: any;
    let listEle: any;
    let openRan = false;
    let lastOpen = false;
    let lastEle: any;

    createEffect(() => {
        let flag = false;
        if (ctx && self) {
            const parentName = self.parentElement.getAttribute('x-name');
            flag = ctx.store.min && parentName === '__root';
        }
        setMin(flag);
        if (!flag && ctx?.dir === 'v') {
            setTimeout(() => {
                const parentPadding = self.parentElement.getAttribute('x-padding');
                const padding = parseInt(parentPadding) + 16;

                self.setAttribute('x-padding', parentPadding);
                listEle.setAttribute('x-padding', padding);
            });
        }
    });

    onMount(() => {
        // 获取上级的padding
        const parentPadding = self.parentElement.getAttribute('x-padding');
        // 子菜单增加padding
        const padding = parseInt(parentPadding) + 16;

        self.setAttribute('x-padding', parentPadding);
        listEle.setAttribute('x-padding', padding);

        const parentName = self.parentElement.getAttribute('x-name');
        const item = {
            name: props.name,
            parent: null,
            children: []
        }
        if (ctx && props.name) {
            ctx.treeMap[props.name] = item;
            if (parentName === '__root') {
                ctx?.tree.push(item)
            } else {
                const parent = ctx.treeMap[parentName];
                item.parent = parent;
                parent.children.push(item);
            }
        }
    });
    const onSelect = () => {
        ctx?.setOpen(props.name)
    }

    const align = props.align || (ctx?.dir === 'h' ? 'bottom' : 'rightTop');
    return <Show when={min() || ctx?.dir === 'h'} fallback={
        <li classList={classList()} ref={self}>
            <MenuItem icon={props.icon} cert isSubmenuTitle onSelect={onSelect}>{props.title}</MenuItem>
            <ul class="ae-menu-submenu-list" ref={listEle} x-name={props.name}>{props.children}</ul>
        </li>
    }>
        <li classList={classList()} ref={self}>
            <Dropdown align={align} theme={ctx?.theme} revers={false} menu={<ul class="ae-menu-submenu-list" ref={listEle} x-name={props.name}>{props.children}</ul>}>
                <MenuItem icon={props.icon} cert isSubmenuTitle onSelect={onSelect}>{props.title}</MenuItem>
            </Dropdown>
        </li>
    </Show>
}
