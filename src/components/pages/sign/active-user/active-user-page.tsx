import {observer} from "mobx-react";
import styles from "./active-user.page.module.scss";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useBean} from "ironbean-react";
import {RegistrationApi} from "@/src/api/registrationApi";

export interface IActiveUserPageProps  {
}

const ActiveUserPage = observer((props: IActiveUserPageProps) => {
    const { code } = useParams();
    const registrationApi = useBean(RegistrationApi);
    const [success, setSuccess] = useState<boolean|null>(null);

    useEffect(() => {
        if (code) {
            registrationApi.activeUser({token: code}).then(() => {
                setSuccess(true)
            }).catch(() => {
                setSuccess(false);
            })
        }
    }, [code]);

    return <div className={styles.layout}>
        {success !== null && <div>
            {success ? "Account activated" : "Account already activated"}
        </div>}
    </div>
});

export default ActiveUserPage;