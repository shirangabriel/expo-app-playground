import Auth from './Auth';
import Features from './features';

export default function EntryPoint() {

    const renderView = () => {

        let isAuthenticated = true

        if (isAuthenticated)
            return <Features />
        else
            return <Auth />
    }


    return renderView()

}