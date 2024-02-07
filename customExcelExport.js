// function to export data as excel
function customExportExcel(fileName, dataComp, expoType) {
    var expoType = expoType.toLowerCase();
    var resSet = dataComp.resultset;
    testTypes = dataComp.metadata;
    testJson = [];
    for (var i in resSet) {
        testJson.push(objectify(resSet[i]));
    }
    if (expoType == 'excel') {
        var fName = fileName + '.xls';
        claimExIndex = -1;
        slrrefExIndex = -1;
        policyExIndex=-1;
        slrcntExIndes=-1;
        assAdjExIndes=-1;
        rowLocExIndes=-1;
        emitXmlHeader = function() {
            var headerRow = '<ss:Row>\n';
            for (var colName1 = 0; colName1 < testTypes.length; ++colName1) {
                colNa = testTypes[colName1].colName;
                
                if (colNa == 'Claim Number') claimExIndex = colName1 + 1;
                if (colNa == 'Seller Reference') slrrefExIndex = colName1 + 1;
                if (colNa == 'Policy Number') policyExIndex = colName1 + 1;
                if (colNa == 'Seller Contact Name') slrcntExIndes = colName1 + 1;
                if (colNa == 'Assigning Adjuster') assAdjExIndes = colName1 + 1;
                if (colNa == 'Row Location') rowLocExIndes = i + 1;
                
                colTy = testTypes[colName1].colType;
                if (colTy == 'Numeric' || colTy == 'Integer') {
                    colTy = 'Number';
                }
                headerRow += '  <ss:Cell>\n';
                headerRow += '    <ss:Data ss:Type="String">';
                headerRow += colNa + '</ss:Data>\n';
                headerRow += '  </ss:Cell>\n';
            }
            headerRow += '</ss:Row>\n';
            return '<?xml version="1.0"?>\n' +
                '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
                '<ss:Worksheet ss:Name="Sheet1">\n' +
                '<ss:Table>\n\n' + headerRow;
        };

        emitXmlFooter = function() {
            return '\n</ss:Table>\n' +
                '</ss:Worksheet>\n' +
                '</ss:Workbook>\n';
        };
        jsonToSsXml = function(jsonObject) {
            var row, col, xml, flag = 0;
            var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;
            xml = emitXmlHeader();
            for (row = 0; row < data.length; row++) {
                xml += '<ss:Row>\n';
                for (col in data[row]) {
                    xml += '  <ss:Cell>\n';
                    if (testTypes[flag].colType == 'Numeric' || testTypes[flag].colType == 'Integer') {
                        xml += '    <ss:Data ss:Type="Number">';
                    } else {
                        if (testTypes[flag].colType == 'Date' || testTypes[flag].colType == 'Blob') {
                            xml += '    <ss:Data ss:Type="String">';
                        } else {
                            xml += '    <ss:Data ss:Type="' + testTypes[flag].colType + '">';
                        }
                    }
                    if(claimExIndex == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';
                    } else if(slrrefExIndex == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';    
                    } else if(policyExIndex == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';    
                    } else if(slrcntExIndes == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';    
                    } else if(assAdjExIndes == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';    
                    } else if(rowLocExIndes == +col.replace(/['"]/g,"")){
                        xml += data[row][col] + '</ss:Data>\n';
                    } else{
                        xml += formDate(data[row][col]) + '</ss:Data>\n';
                    }
                    xml += '  </ss:Cell>\n';
                    flag++;
                }
                flag = 0;
                xml += '</ss:Row>\n';
            }
            xml += emitXmlFooter();
            return xml;
        };

        download = function(content, filename, contentType) {
            if (!contentType) contentType = 'application/octet-stream';
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.id = 'exExcel';
            var a = document.getElementById('exExcel');
            var blob = new Blob([content], {
                'type': contentType
            });
            a.href = window.URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            a.remove();
        };

        if (navigator.msSaveBlob) { // IE 10+
            var blob = new Blob([jsonToSsXml(testJson)], {
                type: "text/excel;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fName + ".xls")
        } else {
            download(jsonToSsXml(testJson), fName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }
        // To make key  val pairs object
    } else if (expoType == 'csv') {
        claimIndex =-1;
        slrrefExIndex=-1;
        policyExIndex=-1;
        slrcntExIndes=-1;
        assAdjExIndes=-1;
        rowLocExIndes=-1;
        /*====================================================================||    
        ||    //This else part is only for CSV Code .............               ||
        ||                            										  ||
        ======================================================================||	*/
        var fName = fileName;
        var arrData = typeof testJson != 'object' ? JSON.parse(testJson) : testJson;
        var colHead = typeof testTypes != 'object' ? JSON.parse(testTypes) : testTypes;
        var CSV = '';
        var row = "";
        for (var i = 0; i < colHead.length; ++i) {
            colHeadName=colHead[i].colName;
            row += colHeadName + ";";
            
            if (colHeadName == 'Claim Number') claimIndex = i + 1;
            if (colHeadName == 'Seller Reference') slrrefExIndex = i + 1;
            if (colHeadName == 'Policy Number') policyExIndex = i + 1;
            if (colHeadName == 'Seller Contact Name') slrcntExIndes = i + 1;
            if (colHeadName == 'Assigning Adjuster') assAdjExIndes = i + 1;
            if (colHeadName == 'Row Location') rowLocExIndes = i + 1;
            
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                
                if(claimIndex == +index.replace(/['"]/g,""))
                row +='="'+arrData[i][index] + '";';
                //row +=  " "+arrData[i][index] + ';';
                else if(slrrefExIndex == +index.replace(/['"]/g,""))
                row +=  arrData[i][index] + ';';
                else if(policyExIndex == +index.replace(/['"]/g,""))
                row +=  arrData[i][index] + ';';
                else if(slrcntExIndes == +index.replace(/['"]/g,""))
                row +=  arrData[i][index] + ';';
                else if(assAdjExIndes == +index.replace(/['"]/g,""))
                row +=  arrData[i][index] + ';';
                else if(rowLocExIndes == +index.replace(/['"]/g,""))
                row +='="'+arrData[i][index] + '";';
                else
                row +=  formDate(arrData[i][index]) + ';';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        var CSV = 'sep=;\n' + CSV;
        if (navigator.msSaveBlob) { // IE 10+
            var blob = new Blob([CSV], {
                type: "text/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fName + ".csv")
        } else {
            var contentType = "data:text/csv;charset=utf-8";
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.id = 'exCsv';
            var a = document.getElementById('exCsv');
            var blob = new Blob([CSV], {
                'type': contentType
            });
            a.href = window.URL.createObjectURL(blob);
            a.download = fName + '.csv';
            a.click();
            a.remove();
        }
    } else {
        try {
            throw "Incorrect export Type, Only Excel or Csv can be accepted";
        } catch (err) {
            console.log(err);
        }
    }

    function objectify(array) {
        var count = 0;
        return array.reduce(function(p, c) {
            ++count;
            p["'" + count + "'"] = c;
            return p;
        }, {});
    }

function formDate(dateToFormate) {
        if (isNaN(dateToFormate) && !(/[^0-9\.\-\:\ ]/.test(dateToFormate))) { //Checked for numeric
            var dt = new Date(dateToFormate);
             if ( isNaN(dt.getTime()) ) { //Checked for date
                return dateToFormate; //Return string if not date.
            } else if(dateToFormate.length >11){ //Checked for date with time
                var splitVal=dateToFormate.split('-');
                var d = new Date(dateToFormate);
               var year = splitVal[0];
               var month = splitVal[1];
               var day = splitVal[2].split(' ')[0];
               var time = splitVal[2].split(' ')[1].split(':');

                if (expoType == 'csv') {
                    var strDate = month + "-" + day + "-" + year +' '+ time[0] +':'+time[1]+':'+time[2];
                    strDate1 = '="' + strDate + '"';
                    return strDate1;
                } else {
                    return month + "-" + day + "-" + year +' '+ time[0] +':'+time[1]+':'+time[2]; //Return date **Can do further operations here.
                }
                return dateToFormate;
            } else {
                var splitVal=dateToFormate.split('-');
                var d = new Date(dateToFormate);
               var year = splitVal[0];
               var month = splitVal[1];
               var day = splitVal[2];

                if (expoType == 'csv') {
                    var strDate = month + "-" + day + "-" + year;
                    strDate1 = '="'+strDate + '"';
                    return strDate1;
                } else {
                    return month + '-' + day + '-' + year; //Return date **Can do further operations here.
                }
            }
        } else {
            if(dateToFormate === null || dateToFormate ==="")
                return "";
            else if (dateToFormate)
                return dateToFormate;
            else
                return 0;
             //Return string as it is number
        }

    }


}

// Code ends here
