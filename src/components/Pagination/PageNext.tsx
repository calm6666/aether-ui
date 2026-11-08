import { FeatherChevronRight } from "aether-icons/feather";

export function PageNext (props: any) {
    const classList = () => ({
        'ae-pagination-num': true,
        'ae-pagination-next': true,
        'ae-pagination-num-disabled': props.disabled
    });
    return (<li onClick={props.onClick} classList={classList()}>
        <FeatherChevronRight />
    </li>);
}
