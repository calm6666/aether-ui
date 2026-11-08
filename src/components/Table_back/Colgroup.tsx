import { For } from "solid-js";

import { TableStore, ColumnProps } from '.';

type ColgroupProps = {
    data: TableStore,
}

export function Colgroup (props: ColgroupProps) {
    return <colgroup class="ae-table-colgroup">
        <For each={props.data.columns}>
            {(col: ColumnProps) => {
                const style = () => ({
                    width: col.width
                });
                return <col class="ae-table-col" style={style()} />
            }}
        </For>
    </colgroup>
}