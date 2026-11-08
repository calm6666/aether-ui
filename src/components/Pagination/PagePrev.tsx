import { FeatherChevronLeft } from "aether-icons/feather";

export function PagePrev (props: any) {
    const classList = () => ({
        'ae-pagination-num': true,
        'ae-pagination-prev': true,
        'ae-pagination-num-disabled': props.current === 1
    });
    return (<li onClick={props.onClick} classList={classList()}>
        <FeatherChevronLeft />
    </li>);
}
