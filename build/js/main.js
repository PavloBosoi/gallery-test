'use strict';
$(function () {
/*    $('.js-photo').on('click',function(){
        var popupPhoto = $('#popup-photo');
        if($('div').is(popupPhoto)){
            deleteGalleryPopup(popupPhoto);
            createGalleryPopup($(this));
        }
        else{
            createGalleryPopup($(this));
        }
    });*/

    PBGallery($('.gallery'));

    function PBGallery(galleryClass){
        $('<div id="popup-photo"/>').appendTo('body');
        $('<div class="overlay"/>').appendTo('body');
        var galleryPhoto = galleryClass.children(),
            popupPhoto = $('#popup-photo'),
            overlay = $('.overlay');
        galleryPhoto.on('click',function(){
            if(popupPhoto.html()==''){
                createGalleryPopup($(this),popupPhoto,overlay);
            }
            $(document).mouseup(function (e){ // событие клика по веб-документу
                if (!popupPhoto.is(e.target) && popupPhoto.has(e.target).length === 0) { //если клик был не по селектору и его содержимому
                    overlay.fadeOut(500); // скрываем подложку
                    popupPhoto.fadeOut(500,function(){
                        $(this).empty();
                    });
                }
            });
        });
                    trashGalleryItem(galleryPhoto,galleryClass);
    }

    function createGalleryPopup(currentPhoto,popupBlock,overlayBlock){
            var photoClone = currentPhoto.clone().addClass('clone-photo'),
                popupWidth = currentPhoto.width()*2,
                popupHeight = currentPhoto.height()*2;
            $('body').find(popupBlock).append(photoClone);
            popupBlock.css({
                'width':popupWidth,
                'height':popupHeight,
                'margin-top':-popupHeight/2,
                'margin-left':-popupWidth/2,
                'z-index': 8020
            }).fadeIn(500);
            overlayBlock.fadeIn(500);
    }

    function deleteGalleryPopup(currentPhoto,popupBlock,overlayBlock){
        //overlayBlock.fadeIn(500);
    }

    function trashGalleryItem(galleryPhoto,gallery){
        var galleryParentWidth = gallery.parent().width();
        galleryPhoto.each(function(){
            var rizn = galleryParentWidth - $(this).innerHeight(),
                currentEl = $(this);
                galleryPhoto.each(function(){
                    if((currentEl.innerWidth() < $(this).innerWidth()) && (galleryParentWidth - $(this).innerWidth()) > 0){
                        currentEl = $(this);
                    }
                });
        });
    }

/*    function createGalleryPopup(currentPhoto){
        var photoClone = currentPhoto.clone(),
            popupWidth = currentPhoto.width()*2,
            popupHeight = currentPhoto.height()*2;
        photoClone.appendTo('body').wrap('<div id="popup-photo"/>');
        var popupPhoto = $('#popup-photo');
        popupPhoto.css({
                        'width':popupWidth,
                        'height':popupHeight,
                        'margin-top':-popupHeight/2,
                        'margin-left':-popupWidth/2,
                        'z-index': 8020
                    }).fadeIn(500);
        $('<div class="overlay"/>').appendTo('body').animate({'opacity':1},500);

    }
    function deleteGalleryPopup(deletePhoto){
        var overlay = $('.overlay');
        deletePhoto.fadeOut(500);
        setTimeout(function(){
            deletePhoto.remove();
        },500);
        overlay.animate({'opacity':0},500)
    }*/
});