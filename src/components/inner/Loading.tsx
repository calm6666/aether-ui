import { mergeProps } from "solid-js";

export const Loading = (_props: any) => {
    const props = mergeProps({ size: 14, color: '#fff' }, _props);
    return <span style={{display: 'inline-flex', 'font-size': `${props.size}px`, 'color': props.color}} class="ae-loading">
        <svg viewBox="25 25 50 50" width="1em" height="1em" stroke="currentColor" style={{"transform-origin": "center","animation": "ae-loading-rotate 2s linear infinite"}}>
            <circle cx="50" cy="50" r="20" style={{"fill": "none","stroke-width": "6","stroke-dasharray": "2, 200","stroke-dashoffset": "0","stroke-linecap": "round","animation": "ae-loading-dash 1.5s ease-in-out infinite"}} />
        </svg>
    </span>;
}
