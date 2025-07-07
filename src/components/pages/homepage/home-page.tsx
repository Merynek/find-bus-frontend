import React from "react"
import "./home.page.scss";
import {observer} from "mobx-react";

export interface IHomePageProps {

}

const HomePage = observer((props: IHomePageProps) => {

    return <div className={"layout"}>HOME</div>
});

export default HomePage;