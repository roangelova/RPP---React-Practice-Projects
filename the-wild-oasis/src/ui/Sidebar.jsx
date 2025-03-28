import styled from "styled-components";

import Logo from './Logo'
import MainNav from './MainNav'

const StyledSidebar = styled.aside`
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);

    grid-row: 1/ -1; //all the end of the row
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
        </StyledSidebar>
    );
}

export default Sidebar;