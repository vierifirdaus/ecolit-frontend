import clsx from "clsx"
import { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "phosphor-react"

type TableProps = {
    headers: {
        name: (string | ReactNode)
        canBeOrdered: boolean
        attributeName: string
    }[]
    rows: (string | number | ReactNode)[][]
    page: number,
    className?: string
    setPage: (val: number) => void
    setOrderAttribute: (val: string) => void
    setIsAsc: (val: boolean) => void
    orderAttribute: string
    isAsc: boolean
}

function Table({ headers, rows, page, className, setPage, setOrderAttribute, setIsAsc, orderAttribute, isAsc }: TableProps) {

    const TableComponent = () => <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    headers.map((header) =>
                        <th scope="col" className="px-6 py-4">
                            <div className="flex items-center justify-center">
                                <p className="mr-2 w-min">{header.name}</p>
                                {
                                    header.canBeOrdered &&
                                    (
                                        header.attributeName == orderAttribute ?
                                            isAsc ?
                                                <ArrowDown className="cursor-pointer" size={16} onClick={() => {
                                                    setPage(1)
                                                    setIsAsc(false)
                                                }} weight="bold" />
                                                :
                                                <ArrowUp className="cursor-pointer" size={16} onClick={() => {
                                                    setPage(1)
                                                    setIsAsc(true)
                                                }} weight="bold" />
                                            :
                                            <ArrowDown className="cursor-pointer" size={16} onClick={() => {
                                                setOrderAttribute(header.attributeName)
                                                setPage(1)
                                                setIsAsc(false)
                                            }} weight="thin" />
                                    )
                                }
                            </div>
                        </th>
                    )
                }
            </tr>
        </thead>
        <tbody>
            {
                rows.map((row) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {
                            row.map((data) =>
                                <td className="px-6 py-2 text-center">
                                    {data}
                                </td>
                            )
                        }
                    </tr>
                )
            }
        </tbody>
    </table>


    return <div className={clsx(className, `relative overflow-x-auto rounded-md overflow-hidden`)}>
        <TableComponent />
        <div className="flex justify-end text-sm text-slate-300 gap-2">
            <span>{page}</span>
            <button onClick={() => setPage(page - 1)}>{"<"}</button>
            <button onClick={() => setPage(page + 1)}>{">"}</button>
        </div>
    </div>
}

export default Table