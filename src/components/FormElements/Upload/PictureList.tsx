import { For } from "solid-js";
import { FeatherEye, FeatherX } from "aether-icons/feather";

export function PictureList (props: any) {
    return <ul class="ae-upload-list ae-upload-picture-list">
        <For each={props.files}>
            {(file: any) => {
                return <li class="ae-upload-picture-card">
                    <img class="ae-upload-picture-img" src={file.url} alt=""/>
                    <div class="ae-upload-picture-remove" onClick={() => {
                        props.onRemove && props.onRemove(file);
                    }}>
                        <FeatherX/>
                    </div>
                    <div class="ae-upload-picture-preview" onClick={() => {
                        props.onPreview && props.onPreview(file)
                    }}>
                        <FeatherEye size={20}/>
                    </div>
                </li>
            }}
        </For>
        <li class="ae-upload-picture-add" onClick={props.onClick}>
            {props.children}
        </li>
    </ul>
}
