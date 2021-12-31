import Link from 'next/link';
import { FC, useEffect, useState, useRef } from 'react';

type Props = {
    brand: string;
};

export const Header: FC<Props> = (props) => {

    const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)

    const toggleBurger = () => {
        setIsBurgerMenuActive(x => !x);
    }

    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <Link href="/" passHref>
                            <label className="label is-large">{props.brand}</label>
                        </Link>

                        <a role="button" aria-label="menu" aria-expanded="false" onClick={toggleBurger} className={isBurgerMenuActive ? 'is-active navbar-burger' : 'navbar-burger'}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className={isBurgerMenuActive ? 'is-active navbar-menu' : "navbar-menu"}>
                        <div className="navbar-end">
                            <Link href="/" passHref>
                                <a className='navbar-item'>Home</a>
                            </Link>
                            <Link href="/realtime" passHref>
                                <a className='navbar-item'>
                                    Realtime
                                </a>
                            </Link>
                            <a className="navbar-item" href="https://github.com/nenoNaninu/mesh-viewer">GitHub</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

