import { Accordion as NativeAccordion } from '@mui/material';
import React from "react";
import {AccordionDetails, AccordionSummary} from "@mui/material";
import {Icon} from "@/src/components/components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";

interface IAccordionProps {
    title: React.ReactNode;
    content: React.ReactNode;
    style?: React.CSSProperties;
}

export const Accordion = (props: IAccordionProps) => {
    const {title, content, style} = props;

    return <NativeAccordion style={style}>
        <AccordionSummary
            expandIcon={<Icon icon={IconType.ARROW_DOWN} />}
        >
            {title}
        </AccordionSummary>
        <AccordionDetails>
            {content}
        </AccordionDetails>
    </NativeAccordion>
}