<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title>پیش فاکتور فروش کالا</title>

    <style>
        body {
            font-family: "Tahoma", sans-serif;
            direction: rtl;
            margin: 20px;
            font-size: 13px;
        }

        .invoice-box {
            padding: 15px;
        }

        td {
            text-align: right;
        }

        h2 {
            text-align: center;
            margin-bottom: 15px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        table th,
        table td {
            border: 1px solid #000;
            padding: 6px;
            text-align: right;
        }

        .section-title {
            background: #f3f3f3;
            font-weight: bold;
            text-align: right;
            padding: 5px;
        }

        .row-table {
            width: 100%;
            margin-bottom: 10px;
        }

        .row-table td {
            border: 1px solid #000;
            padding: 5px;
        }

        .footer {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #000;
        }

        .footer div {
            width: 45%;
            text-align: center;
            padding-top: 10px;
        }

        .stamp {
            text-align: center;
        }

        .stamp img {
            width: 120px;
            opacity: 0.8;
        }

        .amount-text {
            margin: 10px 0;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <div class="invoice-box">
        <h2>پیش فاکتور فروش کالا</h2>

        <div class="section-title">مشخصات فروشنده</div>
        <table>
            <tr>
                <td>
                    <span>
                        نام شخص حقوقی:
                    </span>
                    <span>
                       پخش روناک
                    </span>
                </td>
                <td>
                    <span>شناسه ملی:</span>
                    <span>
                        
                    </span>
                </td>
                <td>
                    <span>
                        کد پستی:
                    </span>
                    <span>
                        8914616481
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <span>
                        نشانی:
                    </span>
                    <span>
                        یزد - میدان امیرچخماق ابتدای خیابان سلمان
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>
                        شماره ثبت
                    </span>
                    <span>
                        20908
                    </span>
                </td>
                <td colspan="2">
                    <span>شماره تلفن:</span>
                    <span>02144955738</span>
                </td>
            </tr>
        </table>

        <div class="section-title">مشخصات خریدار</div>
        <table>
            <tr>
                <td>
                    <span>نام:</span>
                    <span>{{$invoice->account->name}}</span>
                </td>
                <td>
                    <span>شناسه ملی:</span>
                    <span></span>
                </td>
                <td>
                    <span>کدپستی:</span>
                    <span></span>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <span>نشانی:</span>
                    <span></span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>شماره تلفن:</span>
                    <span>{{$invoice->account->mobile}}</span>
                </td>

                <td colspan="1">
                    <span>شماره سفارش:</span>
                    <span>{{$invoice->id}}</span>
                </td>

            </tr>
        </table>

        <!-- جدول کالاها -->
        <div class="section-title">مشخصات کالا</div>
        <table class="items">
            <thead>
                <tr>
                    <th>ردیف</th>
                    <th>شرح کالا</th>
                    <th>تعداد</th>
                    <th>واحد</th>
                    <th>مبلغ واحد (ریال)</th>
                    <th>مبلغ کل (ریال)</th>
                </tr>
            </thead>
            <tbody>

                @foreach ($invoice->items as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->product?->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ $item->unit }}</td>
                    <td>{{ number_format($item->total / $item->quantity) }}</td>
                    <td>{{ number_format((int) $item->total) }}</td>
                </tr>
                @endforeach

                <tr class="has-bg">
                    <td colspan="3" class="text-center">حمل و نقل</td>
                    <td colspan="1" class="text-center"></td>
                    <td colspan="1" class="text-center"></td>
                    <td colspan="1" class="text-center">
                        {{ number_format($invoice->shipping_total ?? 0) }}
                    </td>
                </tr>

                <tr class="has-bg">
                    <td colspan="3" class="text-center">جمع کل</td>
                    <td colspan="1" class="text-center"></td>
                    <td colspan="1" class="text-center"></td>
                    <td colspan="1" class="text-center">
                        {{ number_format($invoice->subtotal ) }}
                    </td>
                </tr>

                <tr>
                    <td colspan="3" class="text-center">مبلغ به حروف</td>
                    <td colspan="3" class="text-center">
                        {{ $subtotalWords }} ریال
                    </td>
                </tr>

            </tbody>
        </table>

        <!-- توضیحات -->
        <div class="section-title">توضیحات</div>
        <p>کلیه کالاها تا زمان تسویه نزد مشتری به امانت قرار دارد</p>

        <!-- امضا -->
        <div class="footer">
            <div class="stamp">
                <span>مهر و امضای فروشنده</span>
                <span><img src=""></span>
            </div>
            <div>مهر و امضای خریدار</div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            window.print();
        });
    </script>

</body>

</html>