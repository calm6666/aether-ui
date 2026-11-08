import type { Accessor} from "solid-js";
import { For } from "solid-js";

import type { TableStore, ColumnProps } from '.';

type ColgroupProps = {
    data: TableStore
}

export function Colgroup (props: ColgroupProps) {
    return <colgroup class="ae-table-colgroup">
        <For each={props.data.columns}>
            {(col: ColumnProps, index: Accessor<number>) => {
                return <col class="ae-table-col" width={col._width}/>
            }}
        </For>
    </colgroup>
}
