<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>انوع استعلام هویتی و و بانکی</title>

    <link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">

</head>

<body>
    <!-- header  -->
    <header class="py-2 py-lg-4 d-block bg-white">
        <div class="container">
            <div class="row align-items-center position-relative justify-content-around">

                <div class="col-12 col-lg-1">
                    <a href="/" title="">
                        <img src="{{asset('images/global/logo-black.svg')}}" alt="" id="logo">
                    </a>
                </div>

                <div class="col-12 col-lg-3 ps-0 d-flex justify-content-end">
                    <a href="/dashboard"
                        class="btn-black-transparent d-flex align-items-center justify-content-center transition1"
                        id="dynamic-first">
                        شروع استفاده
                        <i class="icon-arrow-left transition2"></i>
                    </a>
                </div>

            </div>

        </div>
    </header>
    <!-- header  -->

    <!-- hero slide -->
    <section id="hero-slide" class="p-3 prod">
        <div class="container">
            <div class="row py-3 pb-lg-5">


                <div class="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center">
                    <h2 class="title m-0 f40 l64 fw-725 text-725">
                        اعتبار جیب شما
                        <br>
                        <span class="under-text under-text3">
                            با
                        </span>
                        سرویس‌های احراز هویتی و بانکی
                        جیبتون
                    </h2>
                    <p class="m-0 f14 fw-325 l26 text-black3 text-justify mt-3 mb-5">
                        سرویس های احراز هویت
                        شخصی و بانکی
                        خیال شما را راحت می‌کند
                    </p>
                    <a href="/dashboard" class="btn-black bg-black f16 fw-450 l24 d-inline-flex align-items-center justify-content-center  transition1">
                        شروع کنید
                        <i class="icon-arrow-left transition1"></i>
                    </a>
                </div>

                <div class="col-12 col-md-6 d-flex justify-content-end">
                    <img src="/images/customers/pic1.webp" alt="" class="img-fluid">
                </div>

            </div>
        </div>
    </section>
    <!-- hero slide  -->

    <!-- Other  -->
    <section id="other" class="p-2">
        <div class="container">
            <div class="mt-5 mb-4 text-center">
                <h3 class="mb-3 f36 l60 text-black fw-725">سرویس های بانکی</h3>
            </div>
            <div class="row py-5 justify-content-center">

                <div class="col-8 col-md-5 col-lg-4">
                    <a href="/dashboard">
                        <div class="whitebox border-radius-template py-4 py-lg-5 text-center cursor-pointer">
                            <img src="/images/uploads/green-icon1-2.svg" class="mb-4" width="36px" height="96px">
                            <h4 class="f20 fw-600 text-black">سرویس کارت به شبا</h4>
                            <p class="f14 fw-600 text-gray">
                                دریافت شماره شبا از و حساب از شماره کارت
                            </p>
                            <span class="f12 fw-450 text-main showmore position-relative">شروع</span>
                        </div>
                    </a>
                </div>

                <div class="col-8 col-md-5 col-lg-4">
                    <a href="/dashboard">
                        <div class="whitebox border-radius-template py-4 py-lg-5 text-center cursor-pointer">
                            <img src="/images/uploads/green-icon8.webp" class="mb-4" width="36px" height="96px">
                            <h4 class="f20 fw-600 text-black">سرویس حساب به شبا</h4>
                            <p class="f14 fw-600 text-gray">
                                دریافت شماره شبا از شماره حساب
                            </p>
                            <span class="f12 fw-450 text-main showmore position-relative">شروع</span>
                        </div>
                    </a>
                </div>

                <div class="col-8 col-md-5 col-lg-4">
                    <a href="/dashboard">
                        <div class="whitebox border-radius-template py-4 py-lg-5 text-center cursor-pointer">
                            <img src="/images/uploads/green-icon8.svg" class="mb-4" width="36px" height="96px">
                            <h4 class="f20 fw-600 text-black">سرویس تطابق کدملی</h4>
                            <p class="f14 fw-600 text-gray">
                                بررسی منطبق بودن شماره موبایل و کد ملی
                            </p>
                            <span class="f12 fw-450 text-main showmore position-relative">شروع</span>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>
    <!-- Other  -->

    <!-- helps  -->
    <section id="helps">
        <div class="container position-relative py-md-5 py-lg-0">
            <div class="row">

                <div class="col-12 col-md-5 d-flex flex-column justify-content-center align-items-start">
                    <h2 class="text-right-border m-0 f36 l60 border-main-light fw-725 text-black mb-5 mb-lg-0">
                        سرویس هایی که بزودی اضافه خواهد شد
                    </h2>

                </div>

                <div class="col-12 col-md-7 m-0 p-0 d-flex flex-wrap">

                    <div class="col-12 col-md-6 mb-4 px-3">
                        <img src="/images/uploads/customer-auth-ai.svg" class="img-fluid" width="64px"
                            height="64px" />
                        <div>
                            <p class="f18 l30 text-black fw-600 mt-2 mb-0">
                                دریافت خلافی
                            </p>
                            <p class="f14 l26 text-black3 m-0">
                                دریافت خلافی خودرو
                            </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-4 px-3">
                        <img src="/images/uploads/customer-auth-3d.svg" class="img-fluid" width="64px"
                            height="64px" />
                        <div>
                            <p class="f18 l30 text-black fw-600 mt-2 mb-0">
                                استعلام چک برگشتی
                            </p>
                            <p class="f14 l26 text-black3 m-0">
                                استعلام چک برگشتی تنها با کدملی
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
    <!-- helps  -->

    <!-- faq -->
    <section id="faq" class="p2">
        <div class="container py-5">
            <div class="row">

                <div class="col-12 col-md-4 d-flex flex-column align-items-start">
                    <div class="text-right-border border-main mb-4">
                        <h3 class="mb-0 f36 l60 text-black fw-725">
                            سوالات متداول
                        </h3>
                    </div>
                </div>

                <div class="col-12 col-md-8 d-flex align-items-start justify-content-end">
                    <div class="w-100 accordion" id="faqAccordion">
                        <!-- سوال 1 -->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    سرویس های شما معتبر است؟
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    بله سرویسهای ما معتبر و قابل اطمینان است
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    امکان پیاده سازی اختصاصی برای سایت من وجود دارد؟
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    بله امکان پیاده سازی اختصاصی برای اپ یا سایت شما وجود دارد.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    برای استفاده از سرویسهای شما نیاز به ثبت نام است؟
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    بله برای نگهدای تاریخچه درخواستهای شما و همچنین تاریخچه شارژ نیاز است
                                    ثبت نام کنید.
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- faq  -->

    <!-- footer  -->
    <footer class="bg-dark position-relative z-1 text-white">
        <div class="container">
            <div class="row pb-2 text-center">
                کلیه حقوق این اپ متعلق به شرکت روناک همراه تجارت پویا می‌باشد.
            </div>
        </div>
        <img src="/images/global/components/bg-component2.svg" draggable="false"
            class="position-absolute bottom-0 start-0 z-n1">
    </footer>
    <!-- footer  -->

    <script src="{{asset('js/bootstarp.js')}}"></script>
</body>

</html>