import { ModalGen } from '../modal-gen';

type Color = 'primary' | 'accent' | 'warn'
export interface Button {
    icon?: string;
    text?: string;
    color?: Color;
    dismiss?: boolean;
    callback?: () => void | Promise<void>;
}