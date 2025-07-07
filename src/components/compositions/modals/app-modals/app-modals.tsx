import {Observer, observer} from "mobx-react";
import React from "react";
import {ModalData, ModalManager} from "@/src/singletons/modal-manager";
import {useBean} from "ironbean-react";

interface IAppModalsProps {
}

export const AppModals = observer((props: IAppModalsProps) => {
    const _modalManager = useBean(ModalManager);

    const _renderComponents = (data: ModalData|null): React.ReactNode => {
        if (data) {
            return <Observer render={() => {
                return <>
                    {data.render()}
                    {data.subModal && _renderComponents(data.subModal)}
                </>
            }}/>
        }
        return <>
        </>
    }

    return _renderComponents(_modalManager.modals);
});