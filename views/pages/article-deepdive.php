<?php

use helpers\Svg;
use helpers\View;

$imgPath = '../../../assets/images/placeholder/article-deepdive'

?>

<!-- Page Headers -->
<?php View::render('layout/header', ['pageTitle' => 'Sierra Leone - Article']) ?>

<body>
<!-- Navigation -->
<?php View::render('layout/navigation/main-justify') ?>

<div class="article-deepdive">

    <section class="grid-container scroll-track left-right delay-1">
        <div class="grid-x overflow-hidden">

            <div class="cell small-12 large-9 large-offset-1">
                <?php
                View::render('partials/breadcrumb', [
                    'links' => [
                        ['link' => '/press-centre', 'name' => 'Press Centre'],
                        ['link' => '/press-centre/articles', 'name' => 'Articles'],
                        ['link' => '/press-centre/articles/2020', 'name' => '2020'],
                    ]
                ])
                ?>
            </div>
        </div>
    </section>

    <section class="article-headings grid-container scroll-track left-right delay-2">
        <div class="grid-x overflow-hidden">

            <div class="cell small-12 large-9 large-offset-1">
                <h2 class="article-title heading h2">
                    Moyamba and Pujehun Districts score joint UNDP, WFP-supported project 80% for Peacebuilding
                    Project’s Success amidst COVID-19
                </h2>

                <div class="posted-date tag">Posted on November 19, 2020</div>
            </div>
        </div>
    </section>

    <section class="image-with-caption grid-container scroll-track left-right delay-3">
        <div class="grid-x overflow-hidden">

            <div class="image-container cell small-12">
                <div
                        class="featured-image"
                        style="background-image: url('<?= "$imgPath/article-deepdive-featured-image.png" ?>')">
                </div>
            </div>

            <div class="image-caption cell small-8 small-offset-3 large-7 large-offset-2">
                <div class="image-alt">
                    <p class="medium-copy">
                        Jitta Kanneh, Mammy Queen of Makpele Chiefdom, at one of the swamp-rice development livelihoods
                        for peace initiative of the PBF project
                    </p>
                </div>
                <div class="image-author">
                    <p class="medium-copy">
                        <span class="show-for-medium">Photo:<br></span>
                        UNDP Taiwan/Jason Smith
                    </p>
                </div>
            </div>

            <div class="separator cell small-12 large-7 large-offset-2"></div>
        </div>
    </section>


    <?php View::render('organisms/article-deepdive/authors') ?>

    <?php View::render('organisms/article-deepdive/article-text') ?>

    <?php View::render('organisms/content-cards/related-articles') ?>
</div>

<!-- Footer -->
<?php View::render('layout/footer'); ?>
<script type="text/javascript" src="/dist/app.js"></script>
</body>
</html>
