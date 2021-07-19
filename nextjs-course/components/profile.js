// authentication guard
import Auther from "./auth/auther";

export default function Profile() {
    return <>
        <Auther action="block">
            <h1>Profile Page</h1>
        </Auther>
    </>
}