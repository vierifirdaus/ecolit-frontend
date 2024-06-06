import { saveAs } from "file-saver";

export const saveCSV = (name: string, datas: object[]) => {
    const csvRows = [
        Object.keys(datas[0]).join(','),

        ...datas.map(item => 
            Object.values(item)
            .map(field => 
                `"${field.toString().replace(/[\n;]/g, "")}"`)
            .join(',')
        )
    ].join('\r\n'); 
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, name+".csv");
}