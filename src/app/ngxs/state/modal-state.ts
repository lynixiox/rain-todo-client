import { Injectable } from "@angular/core";
import { ModalStateModel } from "../../types";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ToggleEditModalState, ToggleModalState } from "../action/modal-action";

@State<ModalStateModel>({
    name: "modal",
    defaults: {
        showModal: false,
        showEditModal:{
            show: false,
            todo: {
                id: "",
                status: "TODO",
                title: ""
            }
        }
    }
})
@Injectable()
export class ModalState{

    @Action(ToggleModalState)
    addItem(ctx: StateContext<ModalStateModel>, action: ToggleModalState) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            showModal: !state.showModal
        })
    }

    @Action(ToggleEditModalState)
    editItem(ctx: StateContext<ModalStateModel>,action: ToggleEditModalState){
        const state = ctx.getState()
        ctx.setState({
            ...state,
            showEditModal:{
                show: !state.showEditModal.show,
                todo: action.todo
            }
        })
    }
}



