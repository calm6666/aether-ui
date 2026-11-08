
export function PageItem (props: any) {
    const classList = () => ({
        'ae-pagination-num': true,
        'ae-pagination-item-active': props.active
    });
    return <li onClick={props.onClick} classList={classList()}>
        {props.currentIndex}
    </li>;
}
