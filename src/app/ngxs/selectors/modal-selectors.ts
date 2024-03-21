import { Selector } from "@ngxs/store";
import { ModalModel, ModalStateModel } from "../../types";
import { ModalState } from "../state/modal-state";

export class ModalSelectors{
    @Selector([ModalState])
    static modalActive(state: ModalStateModel): boolean{
        return state.showModal
    }
}