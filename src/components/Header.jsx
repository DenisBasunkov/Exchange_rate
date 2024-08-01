import Link from "next/link"
import LinkButton from "./LinkButton/LinkButton"

const TheHeader = async () => {

    const menuLink = [
        {
            label: "Курс валют",
            href: "/",
            icon: "/Exchange.png",
        },
        {
            label: "Конвертация валют",
            href: "/Converter",
            icon: "/Estimate.png",
        }
    ]

    return (
        <header>

            <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/App.png" alt="" className="animation" />
                <h1> VALUTE INFO</h1>
            </div>


            <LinkButton items={menuLink} />


        </header>
    )

}

export default TheHeader