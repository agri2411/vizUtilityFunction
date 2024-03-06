/*
 We want to how rowspan in our table then we can use this function
 its basically for hierarchy we dont want to show repeated name again then we can merge those cell and show as single cell for three-four different rows.
*/

function rowSpanDT(selector) {
            selector.each(function () {
                var values = $(this).find("tr>td:first-of-type")
                var run = 1
                for (var i=values.length-1;i>-1;i--){
                    if ( values.eq(i).text()=== values.eq(i-1).text()){
                        values.eq(i).remove()
                        run++
                    }else{
                        values.eq(i).attr("rowspan",run);
                        values.eq(i).text() == ' '? ' ':values.eq(i).attr("style","border-bottom: 1px solid #E3E3E3!important");
                        run = 1
                    }
                }
            })
        }

// How to call it
rowSpanDT($("#table1 tbody"));
