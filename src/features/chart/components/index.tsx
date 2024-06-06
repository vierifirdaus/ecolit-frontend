import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function LineChart({title,data,type,format}: any) {
    console.log("ini data", data)
    var dataBiru = []
    var dataKuning = []
    var dataMerah = []
    var dataHijau = []
    var dataHitam = []

    if(type=="salman"){
        for(let i=data.length-1;i>=0;i--){
            console.log(data[i])
            dataBiru.push({x: new Date(data[i].date), y: data[i].kertas})
            dataKuning.push({x: new Date(data[i].date), y: data[i].kaca})
            dataMerah.push({x: new Date(data[i].date), y: data[i].plastik})
            dataHijau.push({x: new Date(data[i].date), y: data[i].organik_sisa+data[i].organik_kebun})
            dataHitam.push({x: new Date(data[i].date), y: data[i].residu})
        }
    }
    else if(type=="mitra"){
        var lengthData = data.length>12?12:data.length
        for(let i=data.length-1;i>=data.length-lengthData;i--){
            dataBiru.push({x: new Date(data[i].date), y: data[i].kertas})
            dataKuning.push({x: new Date(data[i].date), y: data[i].kaca + data[i].logam + data[i].plastik_PET+data[i].plastik_lain})
            dataMerah.push({x: new Date(data[i].date), y: data[i].kresek+data[i].multilayer_plastic})
            dataHijau.push({x: new Date(data[i].date), y: data[i].sampah_kebun+data[i].sampah_makanan})
            dataHitam.push({x: new Date(data[i].date), y: data[i].residu})
        }
    }
    else if(type=="pemilahan"){
        for(let i=data.length-1;i>=0;i--){
            dataBiru.push({x: new Date(data[i].bulan), y: data[i].label_biru})
            dataKuning.push({x: new Date(data[i].bulan), y: data[i].label_kuning})
            dataMerah.push({x: new Date(data[i].bulan), y: data[i].label_merah})
            dataHijau.push({x: new Date(data[i].bulan), y: data[i].label_hijau})
            dataHitam.push({x: new Date(data[i].bulan), y: data[i].label_hitam})
        }
    }

    var xAxisFormat = ""

    if(format=="hari"){
        xAxisFormat = "DD MMM YYYY"
    }
    else if(format=="bulan"){
        xAxisFormat = "MMM YYYY"
    }
    

    
    const options = {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        title: {
            text: title
        },
        axisX: {
            title: "Tanggal Penanganan",
            valueFormatString: xAxisFormat,
        },
        axisY: {
            title: "Jumlah Penanganan (kg)",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            labelFontColor: "#6D78AD",
            tickColor: "#6D78AD"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: function (e: any) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },
        data: [
            {
                type: "line",
                name: "Label Biru",
                color : "#6D78AD",
                showInLegend: true,
                xValueFormatString: xAxisFormat,
                yValueFormatString: "#,##0 Kilogram",
                dataPoints: dataBiru
            },
            {
                type: "line",
                name: "Label Kuning",
                color : "#F9A602",
                showInLegend: true,
                xValueFormatString: xAxisFormat,
                yValueFormatString: "#,##0 Kilogram",
                dataPoints: dataKuning
            },
            {
                type: "line",
                name: "Label Merah",
                color : "#F20505",
                showInLegend: true,
                xValueFormatString: xAxisFormat,
                yValueFormatString: "#,##0 Kilogram",
                dataPoints: dataMerah
            },
            {
                type: "line",
                name: "Label Hijau",
                color : "#0F9D58",
                showInLegend: true,
                xValueFormatString: xAxisFormat,
                yValueFormatString: "#,##0 Kilogram",
                dataPoints: dataHijau
            },
            {
                type: "line",
                name: "Label Hitam",
                color : "#000000",
                showInLegend: true,
                xValueFormatString: xAxisFormat,
                yValueFormatString: "#,##0 Kilogram",
                dataPoints: dataHitam
            }
        ]
    };

    return <CanvasJSChart options={options} />;
}

export function BarChart({title,labelX,labelY,dataWadah,dataKolaborator,type,data}: any) {
    var dataPoints = []
    if(type=="report-wadah"){
        for(let i=0; i<dataKolaborator.length;i++){
            for(let j=0; j<dataWadah.length;j++){
                if(dataKolaborator[i].email==dataWadah[j].email){
                    dataPoints.push({ y: dataWadah[j]._count.email, label: dataKolaborator[i].nama_organisasi})
                }
            }
        }
    }
    else if(type=="report-besek"){
        dataPoints.push({y: 0, label:"Ukuran 12 cm"})
        dataPoints.push({y: 0, label:"Ukuran 14 cm"})
        dataPoints.push({y: 0, label:"Ukuran 16 cm"})
        dataPoints.push({y: 0, label:"Ukuran 18 cm"})
        dataPoints.push({y: 0, label:"Ukuran >20 cm"})

        for(let i=0;i<dataWadah.length;i++){
            dataPoints[0].y = dataWadah[i]._sum.ukuran_12
            dataPoints[1].y = dataWadah[i]._sum.ukuran_14
            dataPoints[2].y = dataWadah[i]._sum.ukuran_16
            dataPoints[3].y = dataWadah[i]._sum.ukuran_18
            dataPoints[4].y = dataWadah[i]._sum.ukuran_20
        }
    }
    else if(type=="report-thinwall"){
        dataPoints.push({y:0, label:"Ukuran 650 ml"})
        dataPoints.push({y:0, label:"Ukuran 700 ml"})
        dataPoints.push({y:0, label:"Ukuran 750 ml"})
        dataPoints.push({y:0, label:"Ukuran 800 ml"})
        dataPoints.push({y:0, label:"Ukuran 900 ml"})
        dataPoints.push({y:0, label:"Ukuran 1000 ml"})
        dataPoints.push({y:0, label:"Ukuran 1500 ml"})
        dataPoints.push({y:0, label:"Ukuran 2000 ml"})
        dataPoints.push({y:0, label:"Ukuran 3000 ml"})

        for(let i=0;i<dataWadah.length;i++){
            dataPoints[0].y = dataWadah[i]._sum.ukuran_650
            dataPoints[1].y = dataWadah[i]._sum.ukuran_700
            dataPoints[2].y = dataWadah[i]._sum.ukuran_750
            dataPoints[3].y = dataWadah[i]._sum.ukuran_800
            dataPoints[4].y = dataWadah[i]._sum.ukuran_900
            dataPoints[5].y = dataWadah[i]._sum.ukuran_1000
            dataPoints[6].y = dataWadah[i]._sum.ukuran_1500
            dataPoints[7].y = dataWadah[i]._sum.ukuran_2000
            dataPoints[8].y = dataWadah[i]._sum.ukuran_3000
        }
    }
    else if(type=="report-wadah-tidak-sesuai"){

        dataPoints.push({y:0, label:"Tidak Sesuai Ukuran"})
        dataPoints.push({y:0, label:"Rusak"})
        dataPoints.push({y:0, label:"Hanya Wadah"})
        dataPoints.push({y:0, label:"Hanya Tutup"})

        for(let i=0;i<dataWadah.length;i++){
            dataPoints[0].y = dataWadah[i]._sum.tidak_ukuran_panjang + dataWadah[i]._sum.tidak_ukuran_ml
            dataPoints[1].y = dataWadah[i]._sum.rusak_panjang + dataWadah[i]._sum.rusak_ml
            dataPoints[2].y = dataWadah[i]._sum.hanya_wadah_panjang + dataWadah[i]._sum.hanya_wadah_ml
            dataPoints[3].y = dataWadah[i]._sum.hanya_tutup_panjang + dataWadah[i]._sum.hanya_tutup_ml
        }
    }

    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: title
        },
        axisX: {
            title: labelX,
            reversed: true,
        },
        axisY: {
            title: labelY,
            includeZero: true,
        },
        data: [{
            type: "bar",
            dataPoints: dataPoints
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
        />
    </div>
    );
}

