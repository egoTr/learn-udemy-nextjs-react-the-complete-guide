import MainNavigation from './main-nav';

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <div className="app-container">
                {props.children}
            </div>
        </div>
    )
}

export default Layout;