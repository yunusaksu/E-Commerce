import React, { useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import logo from '/images/logo.png';

function Header() {

    const [theme, setTheme] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { products } = useSelector((store) => store.basket)


    const changeTheme = () => {
        const root = document.getElementById("root")
        if (theme) {
            root.style.backgroundColor = "#333333";
            root.style.color = "#fff"
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "#333333"
        }
        setTheme(!theme);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row'>
                <img onClick={() => navigate("/")} className='logo' src={logo} />
                <p className='logo-text'>Mustermann GmbH</p>
            </div>
            <div className='flex-row'>
                <input className='search-input' type="text" placeholder='Suchen' />
                <div>

                    {theme ? <FaMoon className='icon' onClick={changeTheme} /> : <CiLight className='icon' onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="error">
                        <CiShoppingBasket style={{ marginRight: '6px' }} className='icon' />
                    </Badge>
                </div>

            </div>
        </div>
    )
}

export default Header