import { RequestResult } from './model/request-result.model';

export class AppPrint {
    static getRequestResultsPageContent(requestResults: RequestResult[], result): string {
    // static getRequestResultsPageContent(requestResults: RequestResult[], zone, result, startDate, endDate ): string {
        let header, footer, resultsTableHeader, resultstableContent, resultsTableFooter, popupWin;
        header = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">
        <head>
          <title>نتيجة</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
        <body >
        <div class="container">`;
        resultsTableHeader = `
        <table id="resultsTable" class="table table-responsive-sm table-hover table-outline mb-0">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th class="text-center">رقم الطلب</th>
            <th class="text-center">الرقم القومي</th>
            <th class="text-center">الاسم</th>
            <th class="text-center">العنوان</th>
            <th class="text-center">النتيجة</th>
            <th class="text-center">الاعاقة</th>
          </tr>
        </thead>
        <tbody>
        `
        // resultstableContent = document.getElementById('resultsTable').innerHTML;
        resultstableContent = ` `;
    
        for (var x = 0; x<requestResults.length ; x++){
          resultstableContent = resultstableContent + `<tr>
    
          <td class="text-center"> <b>${x+1}</b></td>
          <td class="text-center"> ${requestResults[x].requestId}</td>
          <td class="text-center"> ${requestResults[x].nationalId}</td>
          <td class="text-center"> ${requestResults[x].citizenName}</td>
          `
    
          if(requestResults[x].address != null ){
            resultstableContent = resultstableContent + `
            <td class="text-center"> ${requestResults[x].address}</td>
            ` 
          }else{
            resultstableContent = resultstableContent + `
            <td class="text-center"> لا يوجد</td>
            `
          }
          if(requestResults[x].result != null){
            resultstableContent = resultstableContent + `
            <td class="text-center"> ${requestResults[x].citizenName}</td>
            ` 
          }else{
            
            resultstableContent = resultstableContent + `
            <td class="text-center"> لم تحدد</td>
            `
          }
    
    
    
          if(requestResults[x].disability != null){
            resultstableContent = resultstableContent + `
            <td class="text-center"> ${requestResults[x].disability}</td>
            ` 
          }else{
            resultstableContent = resultstableContent + `
            <td class="text-center"> لم تحدد</td>
            `
          }
          resultstableContent = resultstableContent + `</tr>` 
        }
    
    
        resultsTableFooter = ` </tbody> </table> `
        footer = `</div> </body> </html> `;

        return header+ resultsTableHeader + resultstableContent +resultsTableFooter+footer;
    } 
    static getReceivedDocumentReceiptPageContent(name, custom, eyeCommitteeDate, bonesCommitteeDate): string {
        return `
        <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">

<head>
    <title>إيصال استلام مستندات</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css">
        div.one {
            margin: 0;
            padding: 0;
            border-style: solid;
            border-width: 1px;
        }

        p.one {
            text-align: center;
            margin: 0;
            padding: 0;
            font-size: 14px;
        }

        p.two {
            margin: 0;
            padding: 0;
            font-size: 22px;
        }

        table {
            width: 100%;
        }

        /* table,
            th,
            td {
                border: 1px solid black; border-collapse: collapse;
            } */

        th {
            text-align: center;
        }

        td {
            padding: 0px;
        }
    </style>

</head>

<body>

    <div class="one">
        <br>
        <table>
            <tr>
                <td>
                    <p class="one"><b> وزارة الصحة والسكان</b></p>
                    <p class="one"><b> الإدارة العامة للمجالس الطبية</b></p>
                    <p class="one"><b> المتخصصة</b></p>
                    <p class="one"><b> السيارات المجهزة</b></p>
                </td>
                <td><img width="80" height="80" src="../../../../../assets/img/brand/logo_2.png" alt="background image" /></td>
                <td>
                    <u>
                        <h2>إيصال استلام مستندات</h2>
                    </u>
                </td>
                <td></td>

            </tr>
        </table>
        <br>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الاسم &#160;&#160; : ${name}</h3>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الجمرك : ${custom}</h3>
        <br>
        <p class="two">
            &#160;&#160;&#160;&#160;&#160;&#160;
            قام بسداد مبلغ وقيمته
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            )&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; تفقيط المبلغ


            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            نظير توقيع الكشف الطبي ( مستعجل / عادى) للحصول على سيارة مجهزه معفاة من
            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            الرسوم الجمركية
        </p>
        <br>
        <p class="two">
            &#160;&#160;&#160;&#160;&#160;&#160;
            وتم تحديد موعد كشف الرمد يوم
            &#160;&#160;&#160;
            (&#160;&#160;&#160;&#160; ${eyeCommitteeDate} &#160;&#160;&#160;&#160;)
            <br><br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            وتم تحديد موعد كشف العظام يوم
            &#160;&#160;
            (&#160;&#160;&#160;&#160; ${bonesCommitteeDate} &#160;&#160;&#160;&#160;)
        </p class="two">

        <br>
        <p class="two">
            &#160;&#160;&#160;&#160;&#160;&#160;
            وتم تسليم المستندات الأتيه:
            <br><br>
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            ✓ صورة الرقم القومي
            <br><br>
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;

            ✓ المؤهل الدراسي
            <br><br>
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;

            ✓ صورة شهادة محو األميه
            <br><br>
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;

            ✓ فك حظر االعفاء الجمركي

        </p>
        <br><br>
        <p style="text-align: center; font-size: 22px;">
            &#160;&#160;&#160;&#160;&#160;&#160;
            يعتمد؛؛؛
        </p>
        <br><br>
    </div>
</body>

</html>
        
        `
    }

    static getPaymentPermsissionPageContent(name, custom): string {
        return `
        <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">

<head>
    <title>إذن دفع</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css">
        div.one {
            margin: 0;
            padding: 0;
            border-style: solid;
            border-width: 1px;
        }

        p.one {
            text-align: center;
            margin: 0;
            padding: 0;
            font-size: 14px;
        }

        p.two {
            margin: 0;
            padding: 0;
            font-size: 22px;
        }

        table {
            width: 100%;
        }

        /* table,
            th,
            td {
                border: 1px solid black; border-collapse: collapse;
            } */

        th {
            text-align: center;
        }

        td {
            padding: 0px;
        }
    </style>

</head>

<body>

    <div class="one">
        <br>
        <table>
            <tr>
                <td>
                    <p class="one"><b> وزارة الصحة والسكان</b></p>
                    <p class="one"><b> الإدارة العامة للمجالس الطبية</b></p>
                    <p class="one"><b> المتخصصة</b></p>
                    <p class="one"><b> السيارات المجهزة</b></p>
                </td>
                <td><img width="80" height="80" src="../../../../../assets/img/brand/logo_2.png" alt="background image" /></td>
                <td>
                    <h2>إذن دفع</h2>
                </td>
                <td></td>

            </tr>
        </table>
        <br>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الاسم &#160;&#160; : ${name}</h3>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الجمرك : ${custom}</h3>
        <br>
        <p class="two">
            &#160;&#160;&#160;&#160;&#160;&#160;
            سداد مبلغ وقيمته
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            )&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; تفقيط المبلغ


            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            نظير توقيع الكشف الطبي ( مستعجل / عادى) للحصول على سيارة مجهزه معفاة من
            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            الرسوم الجمركية


        </p>
        <br><br>
        <p style="text-align: center; font-size: 22px;">
            &#160;&#160;&#160;&#160;&#160;&#160;
            يعتمد؛؛؛
        </p>
        <br><br>
    </div>
    <div class="one">
        <br>
        <table>
            <tr>
                <td>
                    <p class="one"><b> وزارة الصحة والسكان</b></p>
                    <p class="one"><b> الإدارة العامة للمجالس الطبية</b></p>
                    <p class="one"><b> المتخصصة</b></p>
                    <p class="one"><b> السيارات المجهزة</b></p>
                </td>
                <td><img width="80" height="80" src="../../../../../assets/img/brand/logo_2.png" alt="background image" /></td>
                <td>
                    <h2>إذن دفع</h2>
                </td>
                <td></td>

            </tr>
        </table>
        <br>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الاسم : ${name}</h3>
        <h3>&#160;&#160;&#160;&#160;&#160;&#160; الجمرك : ${custom}</h3>
        <br>
        <p class="two">
            &#160;&#160;&#160;&#160;&#160;&#160;
            سداد مبلغ وقيمته
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            )&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; تفقيط المبلغ


            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            نظير توقيع الكشف الطبي ( مستعجل / عادى) للحصول على سيارة مجهزه معفاة من
            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            الرسوم الجمركية


        </p>
        <br><br>
        <p style="text-align: center; font-size: 22px;">
            &#160;&#160;&#160;&#160;&#160;&#160;
            يعتمد؛؛؛
        </p>
        <br><br>
    </div>

</body>

</html>
        `

    }

    static getRequestDocumentPageContent(name, mobileNumber, custom, requestType): string {
        return `
        <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">

<head>
    <title>إذن دفع</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css">
        div.one {
            margin: 0;
            padding: 0;
            border-style: solid;
            border-width: 1px;
        }

        p.one {
            font-size: 14px;
        }

        p.two {
            margin: 0;
            padding: 0;
            font-size: 18px;
        }

        p.two {
            font-size: 16px;
        }

        table {
            width: 100%;
        }

        /* table,
            th,
            td {
                border: 1px solid black; border-collapse: collapse;
            } */

        th {
            text-align: center;
        }

        td {
            padding: 0px;
        }
    </style>

</head>

<body>
    <div class="one">
        <img width="90" height="90" src="../../../../../assets/img/brand/logo_2.png" align="right" alt="background image" />
        <p class="one"><b>
                وزارة الصحة والسكان
                <br> الإدارة العامة للمجالس الطبية
                <br> المتخصصة
                <br> السيارات المجهزة
            </b>
        </p>


        <u>
            <h3 style="text-align: center"> طلب توقيع الكشف الطبي للحصول على سيارة معفاة من الرسوم الجمركية </h3>
        </u>
        <table style=" border-collapse:separate; border-spacing: 0 1px">
            <tr>
                <td>
                    <p class="two">&#160;&#160;<b>الاسم</b> &#160;&#160;:&#160;&#160;${name}</p>
                </td>
                <td>
                    <p class="two">&#160;&#160;<b>رقم التليفون</b> :&#160;&#160; ${mobileNumber}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p class="two">&#160;&#160;<b>الجمرك</b> :&#160;&#160; ${custom}</p>
                </td>
                <td>
                    <p class="two">&#160;&#160;<b>نوع الكشف</b> &#160;:&#160;&#160; ${requestType}</p>
                </td>
            </tr>
        </table>
        <br>

        <p class="two">

            &#160;&#160;

            سبق الحصول على سيارة مجهزة ؟
            :
            نعم
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            لا
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)

        </p>
        <p class="two">

            <br>
            &#160;&#160;
            <b><u>

                    أقر أنا الموقع أدناه
                    )
                    مصري الجنسية
                    (
                    بالأتي :
                </u></b>
        </p>
        <p class="three">
            &#160;&#160;&#160;&#160;
            • أننى لم يسبق لي الحصول على سيارة معفاة من الجمارك خالل الخمس سنوات السابقة
            <br>
            &#160;&#160;&#160;&#160;
            • أننى على علم بأن المبلغ المدفوع والمقرر لتوقيع الكشف الطبي ال يرد بأى حال من األحوال
            <br>
            &#160;&#160;&#160;&#160;
            • أن كافة البيانات واألوراق التي قدمتها سليمه وصحيحه وإذا تبين عكس ذلك أتحمل المسئولية القانونية
            والجنائية والمدنية
            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            المترتبة على ذلك دون أدنى مسئولية على اإلدارة العامة للمجالس الطبية المتخصصة وأوافق على تصوير جلسة الكشف
            الطبي

        </p>

        <u>
            <h4 style="text-align: center"> مقدم الطلب</h4>
        </u>


        <p style="text-align: center; font-size: 18px;">

            التوقيع:
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            التاريخ:
    </div>
    <div class="one">
        <img width="90" height="90" src="../../../../../assets/img/brand/logo_2.png" align="right" alt="background image" />
        <p class="one"><b>
                وزارة الصحة والسكان
                <br> الإدارة العامة للمجالس الطبية
                <br> المتخصصة
                <br> السيارات المجهزة
            </b>
        </p>

        <u>
            <h3 style="text-align: center"> طلب توقيع الكشف الطبي للحصول على سيارة معفاة من الرسوم الجمركية </h3>
        </u>
        <table style=" border-collapse:separate; border-spacing: 0 1px">
            <tr>
                <td>
                    <p class="two">&#160;&#160;<b>الاسم</b> &#160;&#160;:&#160;&#160;${name}</p>
                </td>
                <td>
                    <p class="two">&#160;&#160;<b>رقم التليفون</b> :&#160;&#160; ${mobileNumber}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p class="two">&#160;&#160;<b>الجمرك</b> :&#160;&#160; ${custom}</p>
                </td>
                <td>
                    <p class="two">&#160;&#160;<b>نوع الكشف</b> &#160;:&#160;&#160; ${requestType}</p>
                </td>
            </tr>
        </table>
        <br>

        <p class="two">

            &#160;&#160;

            سبق الحصول على سيارة مجهزة ؟
            :
            نعم
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            لا
            (&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)

        </p>
        <p class="two">

            <br>
            &#160;&#160;
            <b><u>
                    أقر أنا الموقع أدناه
                    )
                    مصري الجنسية
                    (
                    بالأتي :
                </u></b>
        </p>
        <p class="three">
            &#160;&#160;&#160;&#160;
            • أننى لم يسبق لي الحصول على سيارة معفاة من الجمارك خالل الخمس سنوات السابقة
            <br>
            &#160;&#160;&#160;&#160;
            • أننى على علم بأن المبلغ المدفوع والمقرر لتوقيع الكشف الطبي ال يرد بأى حال من األحوال
            <br>
            &#160;&#160;&#160;&#160;
            • أن كافة البيانات واألوراق التي قدمتها سليمه وصحيحه وإذا تبين عكس ذلك أتحمل المسئولية القانونية
            والجنائية والمدنية
            <br>
            &#160;&#160;&#160;&#160;&#160;&#160;
            المترتبة على ذلك دون أدنى مسئولية على اإلدارة العامة للمجالس الطبية المتخصصة وأوافق على تصوير جلسة الكشف
            الطبي

        </p>

        <u>
            <h4 style="text-align: center"> مقدم الطلب</h4>
        </u>


        <p style="text-align: center; font-size: 18px;">

            التوقيع:
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            التاريخ:
    </div>

</body>

</html>
        `
    }

    static getEyeResultPageContent(nationalId, name, address, governate, eyeCommittee): string {
        return `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">

<head>
    <title>الكشف الطبي</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css">
    p {margin: 0; padding: 0;font-size:11px;}
        table {
            width: 100%;
        }
        
        /* table,
        th,
        td {
            border: 1px solid black; border-collapse: collapse;
        } */
        
        th {
            text-align: center;
        }
        
        td {
            padding: 0px;
        }
    </style>

</head>

<body vlink="blue" link="blue">

    <div>
        <table>
            <tr>
                <td style="text-align: center" >
                    <img  width="80" height="80" src="assets/img/brand/logo_2.png" alt="background image"/>
                </td>
                <td></td>
                <td rowspan="2">
                <img style="border: 1px solid #ddd;" width="120" height="140" src="/assets/img/brand/pp.png" alt="صورة شخصية"/>
                
                </td>
            </tr>
            <tr>
                <td>
                    <p style="text-align: center"><b> وزارة الصحة والسكان</b></p>
                    <p style="text-align: center"><b>  الإدارة العامة للمجالس الطبية</b></p>
                    <p style="text-align: center"><b>  المتخصصة</b></p>
                    <p style="text-align: center"><b> السيارات المجهزة</b></p>
                </td>
                <td ><h2 style="text-align: center">  نتيجة الكشف  الطبي رمد</h2></td>
                
            </tr>
            
        </table>
        <br>
        <table style=" border-collapse:separate; border-spacing: 0 1px">
            <tr>
                <td  colspan="2">
                        <p>الرقم القومي :  ${nationalId}</p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                        <p>الاسم : ${name}</p>
                </td>
            </tr>
            <tr>
                <td >
                    <p>العنوان : ${address}</p>
                </td>
                <td>
                    <p>المحافظة: ${governate}</p>
                </td>
                
            </tr>
            <tr>
                <td colspan="2">
                    <p>تاريخ كشف الرمد : ${eyeCommittee}</p>
                </td>
            </tr>
        </table>
<br>
    <table style="border: 1px solid black; border-collapse: collapse;">
        <col width="30%">
        <col width="35%">
        <col width="35%">
        <tr style="border: 1px solid black; border-collapse: collapse;">
            <th></th>
            <th> <p><b> العين اليمنى</p></b></th>
            <th><p><b>العين اليسرى</b></p></th>
            
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
            <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;">
                <p>قوة الإبصار</p>
            </td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"></td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"></td>
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"> <p>النظارة</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>بنظارة&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>بدون نظارة&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
                
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"><p>تمييز الألوان</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>يميز الألوان&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>لا يميز الألوان&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"><p> مجال النظر</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>سليم :&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>غير سليم :&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
                <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 20px;"><p>يوجد حول حقيقي أو ظاهري يؤثر على سلامة الرؤيا</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>موجود :&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
                <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>غير موجود :&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
        
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;" colspan="3">
                <p style="font-size: 13pt"><b>قرار اللجنة</b></p>
            </td>
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse;">
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>لائق&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>غير لائق&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 20px;"><p>يعاد مناظرته&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;)</p></td>
        </tr>
        
    </table>
<br>
<hr>
<br>
    <p>الطبيب المختص / ...........................................................
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
        الموظف المختص / ...................................................
    </p>
    <!-- <p>الموظف المختص / ...................................................</p> -->
    
    <br>
    <p>التاريخ :
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
        التاريخ :
    </p>
    <p></p>
</div>
</body>

</html>
    `

    }
    static getBonesResultPageContent(nationalId, birthDate, name, occupation, address, governate, mobileNumber, custom, bonesCommittee): string {
        return `
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" dir="rtl" lang="ar">
        
        <head>
            <title>الكشف الطبي</title>
        
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
            <style type="text/css">
            p {margin: 0; padding: 0;font-size:11px;}
                table {
                    width: 100%;
                }
                
                /* table,
                th,
                td {
                    border: 1px solid black; border-collapse: collapse;
                } */
                
                th {
                    text-align: center;
                }
                
                td {
                    padding: 0px;
                }
            </style>
        
        </head>
        
        <body  >
        
            <div class="container">
                <table>
                    <tr>
                        <td>
                            <p style="text-align: center"><b> وزارة الصحة والسكان</b></p>
                            <p style="text-align: center"><b>  الإدارة العامة للمجالس الطبية</b></p>
                            <p style="text-align: center"><b>  المتخصصة</b></p>
                            <p style="text-align: center"><b> السيارات المجهزة</b></p>
                        </td>
                        <td><img width="80" height="80" src="../../../../../assets/img/brand/logo_2.png" alt="background image"/></td>
                        <td><h2>نتيجة الكشف  الطبي</h2></td>
                        <td><img width="80" height="100" src="../../../img/brand/logo_2.png" alt="صورة شخصية"/></td>
                    </tr>
                </table>
                <p>  •   على قرار وزير المالية رقم 861 لسنة 2005 </p>
                <p>  •   على كتاب رئيس مصلحة الجمارك رقم 1151 والمؤرخ في 9/11/2005</p>
                <p>  •  لجنة السيارات المجهزة والمشكلة بقرار وزير الصحة رقم 431 لسنة 1978</p>
        
                <p style="text-align: center"><b>البيانات الشخصية لطالب السيارة المجهزة</b></p>
                <table style=" border-collapse:separate; border-spacing: 0 1px">
                    <tr>
                        <td  colspan="2">
                                <p>الرقم القومي : ${nationalId}</p>
                        </td>
                        <td colspan="2">
                                <p>تاريخ الميلاد : ${birthDate}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                                <p>الاسم : ${name}</p>
                        </td>
                        <td colspan="2">
                                <p>الوظيفة : ${occupation} </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                                <p>العنوان : ${address}</p>
                        </td>
                        <td><p>المحافظة: ${governate}</p></td>
                        <td><p>التليفون : ${mobileNumber} </p></td>
                    </tr>
                    <tr>
                        <td><p>مسلسل الإيداع :</p></td>
                        <td><p>تاريخ الإيداع:</p></td>
                        <td><p>رقم :</p></td>
                        <td><p>الجمرك : ${custom}</p></td>
                    </tr>
                    <tr>
                            <td colspan="2">
                                    <p>تاريخ اللجنة : ${bonesCommittee}</p>
                            </td>
                            <td colspan="2">
                                    <p> المراجع :</p>
                            </td>
                    </tr>
        
                </table>
        
            <table style="border: 1px solid black; border-collapse: collapse;">
                <col width="60%">
                <col width="40%">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <th> <p>توصيف الإعاقة</p></th>
                    <th><p>الحالة تستدعى سيارة مجهزة بـ</p></th>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;">
                       <p>(&#160;&#160;&#160;) شلل بالطرفين السفليين مؤثر على القوة العضلية وحركة المفاصل</p>
                        <p>(&#160;&#160;&#160;) بتر بالطرفين السفليين</p>
                        <p>(&#160;&#160;&#160;) تيبس كامل بمفصل الركبة  اليسرى + اليمنى  يبعد الطرفين السفليين عن الدواسات</p>
                        <p>(&#160;&#160;&#160;) سقوط بالقدمين</p>
                        <p>(&#160;&#160;&#160;) خذل بالطرفين السفليين</p>
                        <p>(&#160;&#160;&#160;) تشوه بالقدمين مؤثر</p>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center; padding: 10px;"><p>دواسة البنزين والفرامل تدار باليد وفاصل الحركة يدار باليد أو اوتوماتيك </p></td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;">
                        <p>(&#160;&#160;&#160;) شلل بالطرف السفلي الأيمن مؤثر علي القوة العضلية وحركة المفاصل</p>
                        <p>(&#160;&#160;&#160;) بتر بالطرف السفلي الأيمن مؤثر</p>
                        <p>(&#160;&#160;&#160;) ضعف بعضلات الطرف السفلي الأيمن مؤثر علي القوة العضلية وحركة المفاصل</p>
                        <p>(&#160;&#160;&#160;) سقوط بالقدم اليمني مؤثر</p>
                        <p>(&#160;&#160;&#160;) بتر بالقدم اليمني مؤثر</p>
                        <p>(&#160;&#160;&#160;) تشوه بالقدم اليمني مؤثر</p>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;"><p>دواسة البنزين والفرامل تدار باليد وفاصل الحركة يدار باليد أو اوتوماتيك</p></td>
                </tr >
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;">
                        <p>(&#160;&#160;&#160;) شلل بالطرف السفلي الأيسر مؤثر علي القوة العضلية وحركة المفاصل</p>
                        <p>(&#160;&#160;&#160;) بتر بالطرف السفلي الأيسر مؤثر</p>
                        <p>(&#160;&#160;&#160;) ضعف بعضلات الطرف السفلي الأيسر مؤثر علي القوة العضلية وحركة المفاصل</p>
                        <p>(&#160;&#160;&#160;) سقوط بالقدم اليسرى مؤثر</p>
                        <p>(&#160;&#160;&#160;) بتر بالقدم اليسرى مؤثر</p>
                        <p>(&#160;&#160;&#160;) تشوه بالقدم اليسرى مؤثر</p>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;"><p>دواسة فاصل الحركة تدار باليد أو اوتوماتيك  </p></td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style=" border: 1px solid black; border-collapse: collapse;text-align: right; padding: 10px;">
                        <p>(&#160;&#160;&#160;) بتر بالطرف العلوي الأيمن ويرتدي طرف صناعي وظيفي يعمل</p>
                        <p>(&#160;&#160;&#160;) شلل اربسي بالطرف العلوي الأيمن وحركة المفاصل في وضع وظيفي والقبضة مقبوله</p>
                    </td>
                    <td style="text-align: center;"><p> مفاتيح التشغيل والاناره بالجهة اليسرى بالإضافة إلي عجله قيادة مائية مزودة ببكره ومنيم بالكف الصناعي + ناقل سرعة اوتوماتيك </p></td>
        
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;">
                        <p>(&#160;&#160;&#160;) بتر بالطرف العلوي الأيسر ويرتدي طرف صناعي وظيفي يعمل</p>
                        <p>(&#160;&#160;&#160;) شلل اربسي بالطرف العلوي الأيسر وحركة المفاصل في وضع وظيفي والقبضة مقبوله</p>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;"><p>  مفاتيح التشغيل والاناره بالجهة اليمني بالإضافة إلي عجله قيادة مائية مزودة ببكره ومنيم بالكف الصناعي + ناقل سرعة اوتوماتيك </p></td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;">
                        <p>(&#160;&#160;&#160;) أخرى</p>
                    </td>
                    <td style="text-align: center;"><p> التجهيز </p></td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;" colspan="2">
                        <p>(&#160;&#160;&#160;) الحالة لا ينطبق عليها شروط الحصول على سيارة مجهزة </p>
                        <p>(&#160;&#160;&#160;)&#160;&#160;&#160; • &#160;&#160; (خزل  / ضعف  / شلل أطفال)  غير مؤثر بالطرف السفلى &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(لا تستدعى)</p>
                        <p>(&#160;&#160;&#160;)&#160;&#160;&#160; • &#160;&#160;  مفصل صناعي بمفصل  ............................ غير مؤثر&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(لا تستدعى)</p>
                        <p>(&#160;&#160;&#160;)&#160;&#160;&#160; • &#160;&#160;  ضعف بالأطراف الأربعة&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(لا تمكنه)</p>
                        <p>(&#160;&#160;&#160;)&#160;&#160;&#160; • &#160;&#160;  شلل دماغي&#160;&#160; • &#160;&#160;	شلل رباعي&#160;&#160; • &#160;&#160;	شلل نصفى طولي (أيمن / أيسر)	&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(لا تمكنه)</p>
                        <p>(&#160;&#160;&#160;)&#160;&#160;&#160; • &#160;&#160;  أخرى ..........................................................................................................&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(  لا تمكنه/ لا تستدعى)</p>
                    </td> 
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;" colspan="2">
                        <p>(&#160;&#160;&#160;) يعاد مناظرته بعد استقرار الحالة &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;) يعاد مناظرته بعد إحضار طرف وظيفي يعمل</p>
                        <p>(&#160;&#160;&#160;) يعاد مناظرته بعد التدريب على الجهاز &#160;&#160;&#160;&#160;&#160;(&#160;&#160;&#160;) يعاد مناظرته بعد إحضار رسم عضلات على ............................</p>
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: right; padding: 10px;" colspan="2">
                        <p><b>السادة أعضاء اللجنة : -</b></p>
                        <p>مقرر اللجنة د / ............................................. &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; أ د / ..............................................</p>
                        <p>أ د / .................................&#160;&#160;&#160;&#160;&#160;&#160; مهندس / ............................................................  &#160;&#160;&#160; ضابط /  .........................................</p>
                        <br><p>....................................</p>
                        <p>&#160;&#160;&#160;&#160;&#160;&#160;مراجعة </p>
                        <p style="text-align: left"><b>مدير عام&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</b></p>
                        <p style="text-align: left"><b>الإدارة العامة للمجالس الطبية المتخصصة</b></p>
                    </td>
                </tr>
            </table>
        </div>
        </body>
        
        </html>
            `;

    }
}
