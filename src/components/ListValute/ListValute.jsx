"use client"

import { useState } from "react"
import { Input, InputGroup, List, Pagination, Panel } from "rsuite"
import dataValute from "@/data/Valute.json"
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon"

const ListValute = ({ data }) => {

    const [searchValute, setSearchValute] = useState("")
    const search = dataValute.filter(items => items.code.includes(searchValute) || items.currency.includes(searchValute)).map(item => item.code)
    const searchData = data.filter(item => search.includes(item.key))
    const dataLength = searchData.length
    const [activePage, setActivePage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(24);
    const lastPointIndex = activePage * postPerPage;
    const firstPostIndex = lastPointIndex - postPerPage;
    const currentData = searchData.slice(firstPostIndex, lastPointIndex);

    if (data.length !== 0) return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InputGroup inside>
                <InputGroupAddon></InputGroupAddon>
                <Input value={searchValute} onChange={setSearchValute} />
                <InputGroup.Button onClick={() => setSearchValute("")}>X</InputGroup.Button>
            </InputGroup>
            <List size="sm" hover className="ListVulute">
                {
                    currentData.length == 0 ? <h1>Нет данных</h1> :
                        currentData.map(item => {
                            return <List.Item key={item.key}>
                                <div style={{ padding: "15px", boxShadow: "0 0 6px 0 hsla(0,0%,0%,.3)", borderRadius: "10px" }}>
                                    1 {item.key} = {item.valRate} {item.baseCurrency}
                                </div>
                            </List.Item>
                        })
                }
            </List>
            <Pagination
                prev
                last
                next
                first
                maxButtons={10}
                layout={["-", 'pager', "-"]}
                size="sm"
                total={dataLength}
                limit={postPerPage}
                activePage={activePage}
                onChangePage={setActivePage} />
        </div>
    )

    return <h1>Не выбрана базовая валюта.</h1>

}

export default ListValute