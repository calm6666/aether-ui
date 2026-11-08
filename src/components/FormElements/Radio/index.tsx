import type { CheckboxProps } from "../Checkbox";
import { Checkbox } from "../Checkbox";
import { useClassList } from "../../utils/useProps";

export function Radio (props: CheckboxProps) {
    const classList = () => useClassList(props, 'ae-radio');
    return <Checkbox {...props} classList={classList()} type="radio"/>
}
