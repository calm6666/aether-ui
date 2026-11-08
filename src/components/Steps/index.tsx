import type { Accessor, JSXElement} from "solid-js";
import { For, children } from "solid-js";
import type { StepProps } from "./Step";
import { useClassList } from "../utils/useProps";
import { InnerStep } from "./InnerStep";
import { Step } from "./Step";

export interface StepsProps {
    size?: 'small'|'default'
    current?: number
    children?: JSXElement
    class?: string
    classList?: any
    style?: any
    dir?: 'v'|'h'
}

export function Steps (props: StepsProps) {
    const items = children(() => props.children)
	const evaluatedItems = () => items.toArray() as unknown as StepProps[];
    const classList = () => useClassList(props, 'ae-steps', {
        [`ae-steps-${props.size}`]: props.size,
        'ae-steps-vertical': props.dir === 'v'
    })


    return <div classList={classList()} style={props.style}>
        <For each={evaluatedItems()}>
            {(item: StepProps, index: Accessor<number>) => {
                return <InnerStep {...item} index={index() + 1} current={props.current || 0}/>
            }}
        </For>
    </div>
}

Steps.Step = Step;
