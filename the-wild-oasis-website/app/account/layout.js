import SideNavigation from "../_components/SideNavigation";

export const metadata = {
    title: 'Account'
};

function Layout({children}) {
    return ( 
        <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
            <aside>
                <SideNavigation/>
            </aside>
            <div className="py-1">
                {children}
            </div>
        </div>
     );
}

export default Layout;