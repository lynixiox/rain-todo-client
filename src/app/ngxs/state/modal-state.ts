import { Injectable } from "@angular/core";
import { ModalStateModel } from "../../types";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ToggleModalState } from "../action/modal-action";

@State<ModalStateModel>({
    name: "modal",
    defaults: {
        showModal: true
    }
})
@Injectable()
export class ModalState{

    @Action(ToggleModalState)
    addItem(ctx: StateContext<ModalStateModel>, action: ToggleModalState) {
        const state = ctx.getState()
        ctx.setState({
            showModal: !state.showModal
        })
    }
}

