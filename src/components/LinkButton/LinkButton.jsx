"use client"

import Link from "next/link"
import { useState } from "react"
import { Drawer, Dropdown } from "rsuite"


const LinkButton = ({ items }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [placement, setPlacement] = useState("top")

    const OpenDrawer = () => {
        if (window.innerWidth < 800) {
            setPlacement("top")
            setIsOpen(true)
        } else {
            setPlacement("right")
            setIsOpen(true)
        }
    }

    return (<>
        <button
            style={{ padding: "5px", border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            onClick={OpenDrawer}><img src="/Menu.png" width={30} /> </button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement={placement} size="xs">
            <Drawer.Header>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/App.png" alt="" className="animation" />
                    <h1> VALUTE INFO</h1>
                </div>
            </Drawer.Header>
            <Drawer.Body>
                <nav className="navigation">
                    {
                        items.map((item, i) => <Link className="Link" href={{
                            pathname: item.href,
                        }} style={{ display: "flex", alignItems: "center", gap: "5px" }}><img src={item.icon} width={35} />{item.label} </Link>)
                    }
                </nav>
            </Drawer.Body>
        </Drawer>
    </>
    )

}

export default LinkButton