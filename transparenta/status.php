<?php
    $haystack = file_get_contents('http://www.farapenali.ro/');
    $start = strrpos ($haystack , ',"semnaturi"');
    $end = strpos ($haystack , ',"semnaturiStranse', $start);
    $judete = substr ( $haystack , $start+14, $end - $start -15)."\n";
    $myArray = explode(',', $judete);

    foreach($myArray as $judet) {
        list($k, $v) = explode(':', $judet);
        $result[ $k ] = trim($v);
    }

    $judete = array('AB' => 'Alba', 'AG' => 'Argeș', 'AR' => 'Arad', 'B' => 'București', 'BC' => 'Bacău', 'BH' => 'Bihor', 'BN' => 'Bistrița-Năsăud', 'BR' => 'Brăila', 'BT' => 'Botoșani', 'BV' => 'Brașov', 'BZ' => 'Buzău', 'CJ' => 'Cluj', 'CL' => 'Călărași', 'CS' => 'Caraș-Severin', 'CT' => 'Constanța', 'CV' => 'Covasna', 'DB' => 'Dâmbovița', 'DJ' => 'Dolj', 'GJ' => 'Gorj', 'GL' => 'Galați', 'GR' => 'Giurgiu', 'HD' => 'Hunedoara', 'HR' => 'Harghita', 'IF' => 'Ilfov', 'IL' => 'Ialomița', 'IS' => 'Iași', 'MH' => 'Mehedinți', 'MM' => 'Maramureș', 'MS' => 'Mureș', 'NT' => 'Neamț', 'OT' => 'Olt', 'PH' => 'Prahova', 'SB' => 'Sibiu', 'SJ' => 'Sălaj', 'SM' => 'Satu Mare', 'SV' => 'Suceava', 'TL' => 'Tulcea', 'TM' => 'Timiș', 'TR' => 'Teleorman', 'VL' => 'Vâlcea', 'VN' => 'Vrancea', 'VS' => 'Vaslui');
    arsort($result);
    $i = 1;

    foreach($result as $key => $value){ 
        $object = new stdClass();
        $object->name = $judete[str_replace("\"", "", $key)];
        $object->value = $value;
        $object->percent = ($value > 20000) ? 100 :$value / 200;
        $object->ok = ($value > 20000) ? "<img src='tick.png' border='0'>" :"&nbsp;";
        $output[$i++] = $object;
        if ($i > 22) break;
    }

    function sort_objects_descending_by_value($a, $b) {
        if($a->value == $b->value){ return 0 ; }
        return ($a->value > $b->value) ? -1 :1;
    }

    usort($output, 'sort_objects_descending_by_value');

    function display_half_list($array, $start, $end) {
        for ($i = $start; $i <= $end; $i++) {
            // Using css to draw the checkmark for completed counties
            $isComplete = $array[$i]->value/20000 >=1 ? 'is-complete' : '';
            $percentage = $array[$i]->value/20000 >= 1 ? '100' : $array[$i]->value/20000*100;

            echo '<section class="county">
                    <h3 class="county-name">'. $array[$i]->name .'</h3>
                    <strong class="county-result '.$isComplete.' color-red"  style="left:'. $percentage .'%;">'. $array[$i]->value .'</strong>
                    <div class="county-progress-bar">
                        <div class="county-progress-done" style="width:'. $percentage .'%;"></div>
                    </div>
                </section>';
        }
    }
?>
<html>
    <head>
        <title>Fără Penali în funcții publice</title>
        <meta charset="UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link rel="manifest" href="./manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <title>Fără Penali în funcții publice</title>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="description" content="Fără Penali în funcții publice"/>

        <meta property="og:image" content="http://transparenta.usr.ro/FP/social.png" />
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="900">
        <meta property="og:title" content="Fără Penali în funcții publice">
        <meta property="og:description" content="Inițiativa cetățenească de modificare a Constituției">
        <meta property="og:url" content="http://transparenta.usr.ro/FP/">
        <meta property="og:type" content="website"/>
        
        <meta name="msvalidate.01" content="CB0DB9020E286E9235ACE3943FEE1E4D" />
        <link rel="canonical" href="http://transparenta.usr.ro/FP/"/>
        <style>
            /* CSS RESET
            ____________________________________*/
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed,
            figure, figcaption, footer, header, hgroup,
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video { margin:0; padding:0; border:0; font-size:100%; font:inherit; vertical-align:baseline; }

            article, aside, details, figcaption, figure,
            footer, header, hgroup, menu, nav, section, main { display:block; }

            html { height:100%; font-size:10px; -webkit-overflow-scrolling:touch; }

            body { height:100%;  line-height:1; box-sizing:border-box; font-family:Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; background-color:#F9FAFB; }

            ol, ul { list-style:none; }

            blockquote, q { quotes:none; }
                blockquote:before, blockquote:after, 
                q:before, q:after { content:''; content:none; }

            table { border-collapse:collapse; border-spacing:0; }

            a { color:inherit; }

            a:link, a:visited, a:hover, a:active { text-decoration:none; }

            strong { font-weight:bold;}

            .container { width:90%; max-width:100rem; min-width:30rem; margin:auto; }

            /* GRID --> edit gutter as needed
            ____________________________________*/
            .grid { display:flex; flex-wrap:wrap; }
                .box-full { width:100%; }
                .box-half { width:50%; }
                .box-third { width:33.333%; }
                .box-two-thirds { width:66.66%; }
                .box-quarter { width:25%; }
                .box-three-quarters { width:75%; }

            .grid.with-gutter { width:calc(100% + 5rem); margin-left:-2.5rem; margin-right:-2.5rem; justify-content:space-around; }
                .grid.with-gutter > .box-quarter { width:calc(25% - 5rem); }
                .grid.with-gutter > .box-third { width:calc(33.333% - 5rem); }
                .grid.with-gutter > .box-two-thirds { width:calc(66.66% - 5rem); }
                .grid.with-gutter > .box-full { width:calc(100% - 5rem); }
                .grid.with-gutter > .box-half { width:calc(50% - 5rem); }
                .grid.with-gutter > .box-three-quarters { width:calc(75% - 5rem); }

            @media all and (max-width:768px) {
                .box-third,
                .box-quarter { width:50%; }
                .box-two-thirds,
                .box-three-quarters { width:100%; }

                .grid.with-gutter > .box-third,
                .grid.with-gutter > .box-quarter,
                .grid.with-gutter > .box-two-thirds,
                .grid.with-gutter > .box-three-quarters { width:calc(100% - 5rem); }
            }
            @media all and (max-width:680px) {
                .box-third,
                .box-quarter,
                .box-half  { width:100%; }

                .grid.with-gutter > .box-third,
                .grid.with-gutter > .box-quarter,
                .grid.with-gutter > .box-half  { width:calc(100% - 5rem); }

                .hidden-sm { display:none; }
            }

            .header{ display:flex; justify-content:space-between; }

            .page-title { font-size:32px; }
            .color-red { color:#ed1c24; }
            .color-blue { color:#00aae7; }
            .padding-top { padding-top:2.4rem; }
            .padding-bottom { padding-bottom:2.4rem; }
            .flex-end { align-items:flex-end; }

            .county { padding:1.2rem 0; font-size:0; position:relative; }
            .county:hover { background-color:#E3F2FD; }
                .county-name { width:50%; font-size:1.8rem; line-height:1; display:inline-block; margin-bottom:.8rem;}
                .county-result:not(.is-complete) { font-size:1.4rem; position:absolute; transform:translateX(-50%); }
                .county-result.is-complete { width:50%; text-align:right; font-size:1.4rem; display:inline-block; position:relative; padding-right:4.2rem; box-sizing:border-box; left:auto !important; }
                .county-result.is-complete:after { content:''; display:block; width:2.4rem; height:1rem; border:.3rem solid #00aae7; border-right-width:0; border-top-width:0; transform:rotate(-45deg); position:absolute; right:0; bottom:.9rem; }
                .county-progress-bar { width:100%; height:1.4rem; border-radius:1.8rem; background-color:#bed8ec; position:relative; overflow:hidden;  }
                    .county-progress-done { height:100%; background-color:#00aae7; border-radius:1.8rem; }

            .footer-info { font-size:1.4rem; font-weight:600; color:#a5a5a5; vertical-align:bottom; }
            .footer-info:nth-child(2n),
            .page-title:nth-child(2n) { text-align:right; }

            @media all and (max-width:680px) {
                .footer-info { margin-bottom:1.6rem; }
                .footer-info:nth-child(2n) { text-align:left; }
                .page-title:nth-child(2n) { text-align:left; margin-top:.4rem; }
            }


        </style>
    </head>
    <body>
        <header class="header container padding-top">
            <div class="grid with-gutter flex-end">
                <a href="https://farapenali.ro/" class="page-title color-blue box-half">Aproape am reuşit
                    <p class="color-red"><strong>Semnează și tu!</strong></p>
                </a>
                <a href="https://farapenali.ro/" class="page-title color-blue box-half">
                    <strong>#FaraPenali</strong>
                </a>
            </div>
        </header>

        <main class="container padding-top padding-bottom">
            <div class="grid with-gutter">
                <div class="box-half">
                    <?php
                        display_half_list($output, 0, 10);
                    ?>
                </div>
                <div class="box-half">
                    <?php
                        display_half_list($output, 11, 21);
                    ?>
                </div>
            </div>
        </main>

        <footer class="footer container padding-top">
            <div class="grid with-gutter flex-end">
                <p class="footer-info box-half">
                    Inițiativa cetățenească</span> sprijinită de <a href="https://www.usr.ro/" title="Uniunea Salvați România"><img src="./logousr.png" alt="Uniunea Salvați România"></a>
                </p>
                <p class="footer-info box-half text-align-right">
                    În parteneriat cu <a href="https://www.rezist.ro/" title="Rezistența"><img src="./logo-rezistenta.png" alt="Rezistența"></a>
                </p>
            </div>
        </footer>
    </body>
</html>
