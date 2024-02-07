 
   //Number Format
    function addCommas(str) {    
       var parts = (str + "").split("."),
            main = parts[0],
            len = main.length,
            output = "",
            first = main.charAt(0),
            i;

        if (first === '-') {
            main = main.slice(1);
            len = main.length;
        } else {
            first = "";
        }
        i = len - 1;
        
        while (i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = "," + output;
            }
            --i;
        }
        // put sign back
        output = first + output;
        // put decimal part back
        if (parts.length > 1) {
            output += "." + parts[1];
        }
        return output;
    }
function interNatNumFormatK(val) 
{
    var val=Number((val).toString().split('.')[0]);
    var type=typeof val;
        if(type!=='number'){            
                var val=0;
            }
        var roundedVal=val,
        first=(roundedVal).toString().charAt(0),
        len=(roundedVal).toString().length,
        main="";
         if (first === '-') {
            main=(roundedVal).toString().split('-')[1];
            len = main.length;
        }
        if(len<=3){
           return val;
        }
        else if(len<=6){
            var ret=(roundedVal/1000)+' K';
        }
        // if(len<=6){
        //    return addCommas(val);
        // }
        else if(len>6 && len<=9){
            var ret=(roundedVal/1000000)+' M';
        }else if(len>9){
            var ret=(roundedVal/1000000000)+' B';
        }
      lastSign=((ret).toString().split(' ')[1]).trim(),
      tempVal=(ret).toString().split(' ')[0],
      mainVal=(tempVal).toString().split('.')[0],
      decMalPoint=(tempVal).toString().split('.')[1];
      if(!decMalPoint){
          decMalPoint='0';
      }
      // if(decMalPoint.length>1){
      //     var finalNum=Number(mainVal).toString()+'.'+decMalPoint[0]+lastSign;
      // }
      // else{
          var finalNum=(mainVal).toString()+lastSign;
      //}
      return finalNum;
}     
function interNatNumFormat(val) 
{
    var val=Number((val).toString().split('.')[0]);
    var type=typeof val;
        if(type!=='number'){            
                var val=0;
            }
        var roundedVal=val,
        first=(roundedVal).toString().charAt(0),
        len=(roundedVal).toString().length,
        main="";
         if (first === '-') {
            main=(roundedVal).toString().split('-')[1];
            len = main.length;
        }
        // if(len<=3){
        //    return val;
        // }
        // else if(len<=6){
        //     var ret=(roundedVal/1000)+' K';
        // }
        if(len<=6){
           return addCommas(val);
        }
        else if(len>6 && len<=9){
            var ret=(roundedVal/1000000)+' M';
        }else if(len>9){
            var ret=(roundedVal/1000000000)+' B';
        }
      lastSign=((ret).toString().split(' ')[1]).trim(),
      tempVal=(ret).toString().split(' ')[0],
      mainVal=(tempVal).toString().split('.')[0],
      decMalPoint=(tempVal).toString().split('.')[1];
      if(!decMalPoint){
          decMalPoint='0';
      }
      if(decMalPoint.length>1){
          var finalNum=Number(mainVal).toString()+'.'+decMalPoint[0]+lastSign;
      }else{
          var finalNum=(mainVal).toString()+lastSign;
      }
      return finalNum;
} 


function getPivotArray(dataIn, timeIndex, header) {
            
    var transData = {};
    var dataOut   = void 0;
    var timeSet   = new Set();
    
    dataIn.resultset.forEach(x => {
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
