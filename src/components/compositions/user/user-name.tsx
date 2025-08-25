import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "../../components/icon/icon";
import {Text} from "../../components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {User} from "@/src/data/users/user";
import {FlexGap} from "@/src/enums/layout.enum";

interface IUserNameProps {
    user: User;
}

export const UserName = (props: IUserNameProps) => {
    const {user} = props;

    return <LayoutFlexRow gap={FlexGap.TINY_8}>
        <Icon icon={IconType.PERSON}/>
        <Text
            text={user.email}
            fontSize={FontSize.BASE_14}
            fontWeight={FontWeight.SEMIBOLD}
        />
    </LayoutFlexRow>
}