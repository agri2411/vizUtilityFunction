function getPivotArrays(dataIn, timeIndex, header) {
    var transData = {};
    var dataOut   = void 0;
    var timeSet   = new Set();
    
    dataIn.forEach(x => {
        var time = x[timeIndex];        
        x.splice(timeIndex, 1);
        var msrVal = x.pop();
        var key = x.join('#@#');
        void 0 === transData[key] && (transData[key] = {});
        transData[key][time] = msrVal;
        timeSet.add(time);
    });
    
        var timeArr = Array.from(timeSet);
        // Added by Sri to sory months
        timeArr.sort(sortByMonthYear);       
        function sortByMonthYear(a, b) {
            var as = a.split(' '),
              bs = b.split(' '),
              ad = new Date(as[0] + ' 1,' + as[1]),
              bd = new Date(bs[0] + ' 1,' + bs[1]);
            return ad.getTime() - bd.getTime();
        }
        // Added by Sri to sory months
        header.push(...timeArr);
        dataOut = [header];
    
    for (var i in transData) {
        var pre = i.split('#@#');
        timeArr.forEach(t => pre.push(void 0 === transData[i][t] ? 0 : addCommas(transData[i][t])));
        dataOut.push(pre);
    }
    
    return dataOut;
}

/*
dataIn    : Actual DataArray
timeIndex : Index of array after which you want Transpose
header    : Pass the header name for columns which will not get transpose

How to call this function
if after first column we need transpose
  getPivotArrays(dataSet, 1, ['Dimension Name'])
if we want after second column
  getPivotArrays(dataSet, 2, ['Dimension Name 1','Dimension Name 2'])
*/
//getPivotArrays(dataIn, timeIndex, header)
