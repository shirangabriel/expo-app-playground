import Screen from "@/app/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { ToggleButton } from "./views/ToggleButton";

const NeumorphismDesign = () => {
    return (
        <Screen style={{ backgroundColor: 'white' }} showCustomBackButton>
            <ToggleButton />
        </Screen>
    );
}

export default NeumorphismDesign