"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import { Accordion, Dropdown, Input, InputGroup, Text, } from "rsuite"
import data from "@/data/Valute.json"

const ValuteSearch = () => {
    const params = useSearchParams()
    const [serchValute, setSerchValute] = useState("")
    const refBlock = useRef(null)

    const searchData = data.filter(item => item.currency.includes(serchValute) || item.code.includes(serchValute))

    return <Accordion bordered style={{ boxShadow: "0 0 6px 0 hsla(0,0%,0%,.3)" }}>
        <Accordion.Panel header="Список валют" defaultExpanded>
            <menu className="SearchMenu">
                <div>
                    <InputGroup style={{ width: "100%" }} inert>
                        <InputGroup.Addon >🔎</InputGroup.Addon>
                        <Input value={serchValute} onChange={setSerchValute} placeholder="Поиск базовой валюты" />
                        <InputGroup.Button onClick={() => setSerchValute("")}>❌</InputGroup.Button>
                    </InputGroup>
                </div>
                {
                    searchData.length === 0 ? <Text muted>Нет данных</Text> :
                        <Dropdown.Menu activeKey={params.get("valute")}
                            style={{ borderRadius: "0px" }}
                            className="SearchListVulute">
                            {
                                searchData.map((item) => {
                                    return <Dropdown.Item
                                        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}
                                        eventKey={item.code}
                                        key={item.code}
                                        as={Link}
                                        href={`/?valute=${item.code}`}
                                    >{item.code} - {item.currency}</Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                }
            </menu>
        </Accordion.Panel>
    </Accordion>


}

export default ValuteSearch