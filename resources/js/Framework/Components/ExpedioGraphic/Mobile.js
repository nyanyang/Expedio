import BaseExpedioGraphic from './';
import {toDataURL} from '~/Framework/Helpers';


class MobileExpedioGraphic extends BaseExpedioGraphic {

    constructor(data, custom) {
        super(data, custom);
    }

    init() {

        this.attachImage();
        
        //non animated for mobile
        if(this.duration) {
            this.attachAnimatedVersion();
        } else {
            this.animated = false;
        }

        this.$el.on('mousedown', this.mousedown.bind(this));

    }

    attachAnimatedVersion() {

        let animatedImg = document.createElement("img");
        
        animatedImg.onload = () => {
            expedio.expedio_elements_loaded ++;
        }
        
        toDataURL(this.imgPath+'.gif', (r) => {
            animatedImg.setAttribute('src', r);
        })

        this.$el.after(animatedImg);

        this.animated = animatedImg;
        this.$animated = $(animatedImg);

        this.$animated.attr('id', 'expedio_gif_'+this.name);

        this.$animated.hide();
        this.$animated.css('pointer-events','none');
        this.$animated.css('zIndex', this.zIndex);
    }

    click(e) {

        if(!this.animated) {
            return;
        }

        this.$el.hide();

        let src = this.animated.src;

        this.$animated.attr('src', '');
        this.$animated.attr('src', src);

        this.$animated.show();

        this.custom.forEach(c => {
            setTimeout(() => {
                this.$animated.css('zIndex', c.zIndex);
            }, c.duration);
        })

        window.animationTimer = setTimeout(() => {

            this.$el.show();
            this.$animated.hide();

        }, this.duration);
    }

    mousedown(event) {

        if(window.animationTimer) {
            clearTimeout(window.animationTimer);
        }
        $('[id^=expedio_element_]').show();
        $('[id^=expedio_gif_]').hide();
        // Get click coordinates
        $(document.elementFromPoint(event.clientX, event.clientY)).off('click');
        $(event.target).off('click');

        if(!expedio.currentEvent) {
            expedio.currentEvent = event; 
        }

        if(this.clickedIsNotTransparent(event)) {

            $(event.target).on('click', this.click.bind(this));
            $(event.target).trigger("click");

            expedio.hiddenElements.forEach(hiddenElem => {
                // $(hiddenElem).show();
                $(hiddenElem).css('pointer-events','auto');

            })
            expedio.hiddenElements = [];

            expedio.currentEvent = null;

        } else {

            if ($(document.elementFromPoint(expedio.currentEvent.clientX, expedio.currentEvent.clientY))[0].tagName === 'IMG') {
                
                expedio.hiddenElements.push($(document.elementFromPoint(expedio.currentEvent.clientX, expedio.currentEvent.clientY))[0]);

                // $(document.elementFromPoint(expedio.currentEvent.clientX, expedio.currentEvent.clientY)).hide();
                $(document.elementFromPoint(expedio.currentEvent.clientX, expedio.currentEvent.clientY)).css('pointer-events','none');
                
                this.triggerMouseEvent(
                    $(document.elementFromPoint(expedio.currentEvent.clientX, expedio.currentEvent.clientY))[0],
                    'mousedown'
                );

                if(expedio.expedio_elements.length === expedio.hiddenElements.length) {

                    expedio.hiddenElements.forEach(hiddenElem => {
                        $(hiddenElem).css('pointer-events','auto');
                    })
                    expedio.hiddenElements = [];
        
                    expedio.currentEvent = null;

                }

            } 
            
        }

    }


}

export default MobileExpedioGraphic;